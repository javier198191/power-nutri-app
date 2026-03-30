import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgresoDto } from './dto/create-progreso.dto';

@Injectable()
export class ProgresoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProgresoDto, urlFoto?: string) {
    const user = await this.prisma.usuario.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return (this.prisma as any).progresoFisico.create({
      data: {
        usuarioId: userId,
        fecha: hoy,
        pesoCorporalKg: dto.pesoCorporalKg || undefined,
        urlFoto: urlFoto || null,
        notas: dto.notas || null,
      },
    });
  }

  async getHistorial(userId: string) {
    return (this.prisma as any).progresoFisico.findMany({
      where: { usuarioId: userId },
      orderBy: { fecha: 'desc' },
    });
  }
}
