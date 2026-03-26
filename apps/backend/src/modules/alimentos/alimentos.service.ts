import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';

@Injectable()
export class AlimentosService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.prisma.alimento.count();
    if (count === 0) {
      const alimentosBase = [
        { nombre: 'Huevo entero', proteinaG: 6, carbohidratosG: 0.6, grasasG: 5, precioPromedioCop: 600, unidadMedida: 'Unidad' },
        { nombre: 'Banano', proteinaG: 1.1, carbohidratosG: 23, grasasG: 0.3, precioPromedioCop: 500, unidadMedida: 'Unidad' },
        { nombre: 'Pechuga de Pollo', proteinaG: 31, carbohidratosG: 0, grasasG: 3.6, precioPromedioCop: 3500, unidadMedida: '100g' },
      ];

      for (const alimento of alimentosBase) {
        await this.prisma.alimento.create({ data: alimento });
      }
      console.log('🌱 Alimentos base insertados');
    }
  }

  private mapDecimalToNumber(alimento: any) {
    if (!alimento) return null;
    return {
      ...alimento,
      proteinaG: alimento.proteinaG.toNumber(),
      carbohidratosG: alimento.carbohidratosG.toNumber(),
      grasasG: alimento.grasasG.toNumber(),
    };
  }

  async create(createAlimentoDto: CreateAlimentoDto) {
    const alimento = await this.prisma.alimento.create({
      data: createAlimentoDto,
    });
    return this.mapDecimalToNumber(alimento);
  }

  async findAll() {
    const alimentos = await this.prisma.alimento.findMany();
    return alimentos.map(a => this.mapDecimalToNumber(a));
  }

  async findOne(id: string) {
    const alimento = await this.prisma.alimento.findUnique({
      where: { id },
    });
    if (!alimento) throw new NotFoundException(`Alimento con id ${id} no encontrado`);
    return this.mapDecimalToNumber(alimento);
  }

  async update(id: string, updateAlimentoDto: UpdateAlimentoDto) {
    const alimento = await this.prisma.alimento.update({
      where: { id },
      data: updateAlimentoDto,
    });
    return this.mapDecimalToNumber(alimento);
  }

  async remove(id: string) {
    await this.prisma.alimento.delete({
      where: { id },
    });
    return { message: `Alimento con id ${id} eliminado` };
  }
}
