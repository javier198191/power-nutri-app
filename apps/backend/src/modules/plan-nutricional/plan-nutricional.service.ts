import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlanNutricionalDto } from './dto/create-plan-nutricional.dto';

@Injectable()
export class PlanNutricionalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPlanDto: CreatePlanNutricionalDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    let totalProteina = 0;
    let totalCarbos = 0;
    let totalGrasas = 0;
    let costoTotal = 0;

    // 1. Obtener detalles de todos los alimentos solicitados para calcular macros y costos
    const items: any[] = [];
    for (const item of createPlanDto.alimentos) {

      const alimento = await this.prisma.alimento.findUnique({
        where: { id: item.alimentoId },
      });
      if (!alimento) throw new NotFoundException(`Alimento con id ${item.alimentoId} no encontrado`);
      
      const cant = item.cantidad;
      totalProteina += alimento.proteinaG.toNumber() * cant;
      totalCarbos += alimento.carbohidratosG.toNumber() * cant;
      totalGrasas += alimento.grasasG.toNumber() * cant;
      costoTotal += alimento.precioPromedioCop * cant;

      items.push({ ...alimento, cantidad: cant });
    }

    // 2. Cálculos finales (macros y calorías)
    const totalCalorias = (totalProteina * 4) + (totalCarbos * 4) + (totalGrasas * 9);
    const saldoRestanteCop = user.presupuestoSemanalCop - costoTotal;
    const presupuestoExcedido = costoTotal > user.presupuestoSemanalCop;

    // 3. Transacción Prisma: Guardamos el PlanNutricional y sus PlanAlimento vinculados
    const result = await this.prisma.$transaction(async (tx) => {
      const plan = await tx.planNutricional.create({
        data: {
          usuarioId: userId,
          costoTotalEstimadoCop: costoTotal,
          totalCalorias: totalCalorias,
        },
      });

      await tx.planAlimento.createMany({
        data: createPlanDto.alimentos.map(item => ({
          planId: plan.id,
          alimentoId: item.alimentoId,
          cantidad: item.cantidad
        }))
      });

      return plan;
    });

    return {
      ...result,
      totalCalorias: result.totalCalorias.toNumber(),
      macros: {
        proteinaG: Number(totalProteina.toFixed(2)),
        carbohidratosG: Number(totalCarbos.toFixed(2)),
        grasasG: Number(totalGrasas.toFixed(2)),
      },
      presupuestoExcedido,
      mensajePresupuesto: presupuestoExcedido ? '⚠️ Presupuesto Excedido' : '✅ Presupuesto dentro del límite',
      saldoRestanteCop,
      alimentos: items.map(i => ({
        id: i.id,
        nombre: i.nombre,
        cantidad: i.cantidad,
        subtotalCop: i.precioPromedioCop * i.cantidad
      }))
    };
  }

  async findLatest(userId: string) {
    const plan = await this.prisma.planNutricional.findFirst({
      where: { usuarioId: userId },
      orderBy: { fechaCreacion: 'desc' },
      include: {
        alimentos: {
          include: {
            alimento: true
          }
        },
        usuario: true
      }
    });

    if (!plan) throw new NotFoundException('No se encontraron planes para este usuario');

    const saldoRestanteCop = plan.usuario.presupuestoSemanalCop - plan.costoTotalEstimadoCop;

    return {
      ...plan,
      totalCalorias: plan.totalCalorias.toNumber(),
      saldoRestanteCop,
      alimentos: plan.alimentos.map(pa => ({
        id: pa.alimento.id,
        nombre: pa.alimento.nombre,
        cantidad: pa.cantidad,
        subtotalCop: pa.alimento.precioPromedioCop * pa.cantidad,
        nutrientes: {
           proteinaG: pa.alimento.proteinaG.toNumber(),
           carbohidratosG: pa.alimento.carbohidratosG.toNumber(),
           grasasG: pa.alimento.grasasG.toNumber()
        }
      }))
    };
  }
}
