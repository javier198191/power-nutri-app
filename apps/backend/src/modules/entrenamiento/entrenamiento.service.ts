import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RecordsService } from '../records/records.service';
import { CreateMesocicloDto } from './dto/create-mesociclo.dto';
import { CreateSesionDto } from './dto/create-sesion.dto';

@Injectable()
export class EntrenamientoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recordsService: RecordsService,
  ) {}

  async createMesociclo(userId: string, dto: CreateMesocicloDto) {
    // Desactivar otros mesociclos activos del usuario
    await this.prisma.mesociclo.updateMany({
      where: { usuarioId: userId, activo: true },
      data: { activo: false },
    });

    return this.prisma.mesociclo.create({
      data: {
        ...dto,
        usuarioId: userId,
        activo: true,
      },
    });
  }

  async getMesocicloActivo(userId: string) {
    const mesociclo = await this.prisma.mesociclo.findFirst({
      where: { usuarioId: userId, activo: true },
    });
    if (!mesociclo) throw new NotFoundException('No hay un mesociclo activo para este usuario');
    return mesociclo;
  }

  private mapSerieDecimal(serie: any) {
    return {
      ...serie,
      pesoKg: serie.pesoKg ? serie.pesoKg.toNumber() : 0,
      rpe: serie.rpe ? serie.rpe.toNumber() : null,
      rir: serie.rir || null,
    };
  }

  async registerSesion(userId: string, dto: CreateSesionDto) {
    const { series, ...sesionData } = dto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Guardar la sesión
      const sesion = await tx.sesionEntrenamiento.create({
        data: {
          ...sesionData,
          usuarioId: userId,
        },
      });

      // 2. Guardar las series y disparar seguimiento de PRs
      const savedSeries: any[] = [];
      for (const s of series) {

        // Validación lógica RPE + RIR (Informativa/Warning en log)
        if (s.rpe && s.rir && s.rpe + s.rir !== 10) {
          console.warn(`[Warning] RPE (${s.rpe}) + RIR (${s.rir}) no suman 10. Se priorizarán los valores individuales.`);
        }

        const serie = await tx.serie.create({
          data: {
            ...s,
            sesionId: sesion.id,
          },
        });
        
        // Seguimiento automático de récords (PRs)
        await this.recordsService.trackPR(userId, s);
        
        savedSeries.push(this.mapSerieDecimal(serie));
      }

      return {
        ...sesion,
        pesoCorporalDia: sesion.pesoCorporalDia ? sesion.pesoCorporalDia.toNumber() : null,
        series: savedSeries,
      };
    });
  }
}

