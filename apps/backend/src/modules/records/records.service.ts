import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  // Fórmula de Epley: Peso * (1 + 0.0333 * Reps)
  calculateE1RM(peso: number, reps: number): number {
    if (reps === 1) return peso;
    const e1rm = peso * (1 + 0.0333 * reps);
    return Number(e1rm.toFixed(2));
  }

  async trackPR(userId: string, serie: any) {
    const pesoKg = Number(serie.pesoKg);
    const repeticiones = Number(serie.repeticiones);
    const ejercicioId = serie.ejercicioId;

    const currentE1RM = this.calculateE1RM(pesoKg, repeticiones);

    // Buscar el mejor récord histórico del usuario para este ejercicio
    const bestRecord = await this.prisma.recordPersonal.findFirst({
      where: { usuarioId: userId, ejercicioId },
      orderBy: { e1RM: 'desc' },
    });

    if (!bestRecord || currentE1RM > bestRecord.e1RM.toNumber()) {
      // ¡Nuevo Récord Personal detectado!
      await this.prisma.recordPersonal.create({
        data: {
          usuarioId: userId,
          ejercicioId,
          pesoMaximo: pesoKg,
          repeticiones,
          e1RM: currentE1RM,
        },
      });
      return true;
    }
    return false;
  }

  async getMyRecords(userId: string) {
    // Obtenemos todos los récords y agrupamos manualmente para compatibilidad total
    const allRecords = await this.prisma.recordPersonal.findMany({
      where: { usuarioId: userId },
      include: { ejercicio: true },
      orderBy: { e1RM: 'desc' },
    });

    // Quedarse solo con el mejor de cada ejercicio
    const uniqueRecords: any[] = [];
    const seenEjercicios = new Set();


    for (const record of allRecords) {
      if (!seenEjercicios.has(record.ejercicioId)) {
        seenEjercicios.add(record.ejercicioId);
        uniqueRecords.push({
          ...record,
          pesoMaximo: record.pesoMaximo.toNumber(),
          e1RM: record.e1RM.toNumber(),
        });
      }
    }

    return uniqueRecords;
  }

  async getProgreso(userId: string, ejercicioId: string) {
    const history = await this.prisma.recordPersonal.findMany({
      where: { usuarioId: userId, ejercicioId },
      orderBy: { fecha: 'asc' },
    });

    return history.map(r => ({
      ...r,
      pesoMaximo: r.pesoMaximo.toNumber(),
      e1RM: r.e1RM.toNumber(),
    }));
  }
}
