import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PlanNutricionalService } from '../plan-nutricional/plan-nutricional.service';
import { EntrenamientoService } from '../entrenamiento/entrenamiento.service';
import { RecordsService } from '../records/records.service';

import { BiometriaService } from '../biometria/biometria.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly planService: PlanNutricionalService,
    private readonly entrenamientoService: EntrenamientoService,
    private readonly recordsService: RecordsService,
    private readonly biometriaService: BiometriaService,
  ) {}


  async getSummary(userId: string) {
    // 0. Cargar Usuario para Biometría
    const user = await this.prisma.usuario.findUnique({ where: { id: userId } });
    const perfilNutri = user ? this.biometriaService.getPerfilNutricional(user) : null;

    // 1. Nutrición (Saldo y Macros del último plan)
    let nutricion = { 
      saldoRestanteCop: 0, 
      consumoActual: 0, 
      macrosConsumidos: { proteinaG: 0, carbohidratosG: 0, grasasG: 0 },
      objetivosDiarios: perfilNutri?.calculoDisponible ? {
        calorias: perfilNutri.caloriasObjetivo,
        macros: perfilNutri.macros
      } : null,
      resumenHoy: '',
      calculoDisponible: perfilNutri?.calculoDisponible || false
    };

    try {
      const plan = await this.planService.findLatest(userId);
      nutricion = {
        ...nutricion,
        saldoRestanteCop: plan.saldoRestanteCop,
        consumoActual: Number(plan.totalCalorias),
        macrosConsumidos: {
          proteinaG: plan.alimentos.reduce((acc, a) => acc + a.nutrientes.proteinaG * a.cantidad, 0),
          carbohidratosG: plan.alimentos.reduce((acc, a) => acc + a.nutrientes.carbohidratosG * a.cantidad, 0),
          grasasG: plan.alimentos.reduce((acc, a) => acc + a.nutrientes.grasasG * a.cantidad, 0),
        }
      };
      
      if (nutricion.objetivosDiarios) {
        nutricion.resumenHoy = `Hoy has consumido ${Math.round(nutricion.consumoActual)} kcal de tus ${nutricion.objetivosDiarios.calorias} kcal objetivo.`;
      }
    } catch (e) {
      // Si no hay plan activo, se mantienen los consumos en 0 y se muestran los objetivos.
      if (nutricion.objetivosDiarios) {
        nutricion.resumenHoy = `Aún no has registrado consumo hoy. Tu objetivo es de ${nutricion.objetivosDiarios.calorias} kcal.`;
      }
    }



    // 2. Entrenamiento (Mesociclo y Última sesión)
    let mesocicloActivo = 'Sin bloque activo';
    try {
      const meso = await this.entrenamientoService.getMesocicloActivo(userId);
      mesocicloActivo = meso.nombre;
    } catch (e) { /* No hay meso */ }

    const ultimaSesion = await this.prisma.sesionEntrenamiento.findFirst({
      where: { usuarioId: userId },
      orderBy: { fecha: 'desc' },
    });

    // 3. Fuerza (Top 3 PRs)
    const records = await this.recordsService.getMyRecords(userId);
    const top3Records = records.slice(0, 3).map(r => ({
      ejercicio: r.ejercicio.nombre,
      e1RM: r.e1RM,
    }));

    // 4. Mensaje Motivacional
    let mensaje = '¡Momento de empezar a entrenar hoy! 🔥';
    if (ultimaSesion) {
      const horasDesdeUltima = (Date.now() - new Date(ultimaSesion.fecha).getTime()) / (1000 * 60 * 60);
      if (horasDesdeUltima <= 24) {
        mensaje = '¡Excelente ritmo! Estás en racha. 🏆';
      } else if (horasDesdeUltima <= 48) {
        mensaje = 'Buen trabajo ayer, mantén la disciplina. 💪';
      }
    }

    return {
      nutricion,
      entrenamiento: {
        mesocicloActivo,
        ultimaSesionFecha: ultimaSesion?.fecha || null,
      },
      fuerza: {
        top3Records,
      },
      estado: {
        mensaje,
      }
    };
  }
}
