import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EjerciciosService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.prisma.ejercicio.count();
    if (count === 0) {
      const basicos = [
        { nombre: 'Sentadilla', esBasico: true, grupoMuscular: 'Pierna' },
        { nombre: 'Press Banca', esBasico: true, grupoMuscular: 'Pecho' },
        { nombre: 'Peso Muerto', esBasico: true, grupoMuscular: 'Posterior' },
      ];

      for (const ej of basicos) {
        await this.prisma.ejercicio.create({ data: ej });
      }
      console.log('🏋️‍♂️ Ejercicios básicos SBD insertados');
    }
  }

  async findAll() {
    return this.prisma.ejercicio.findMany();
  }
}
