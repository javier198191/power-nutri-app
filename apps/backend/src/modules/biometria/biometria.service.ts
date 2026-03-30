import { Injectable } from '@nestjs/common';
import { NivelActividad, Objetivo, Usuario } from '@prisma/client';

@Injectable()
export class BiometriaService {
  /**
   * Calcula la Tasa Metabólica Basal (TMB) usando la fórmula de Mifflin-St Jeor.
   * TMB = (10 * peso_kg) + (6.25 * altura_cm) - (5 * edad) + s
   * (Donde s es +5 para hombres y -161 para mujeres).
   */
  calcularTMB(peso: number, altura: number, edad: number, sexo: string): number {
    const s = sexo === 'HOMBRE' || sexo === 'H' ? 5 : -161;
    return 10 * peso + 6.25 * altura - 5 * edad + s;
  }

  /**
   * Calcula el Gasto Energético Diario Total (TDEE).
   * Factores de actividad:
   * SEDENTARIO: 1.2
   * LIGERO: 1.375
   * MODERADO: 1.55
   * INTENSO: 1.725
   * ATLETA: 1.9
   */
  calcularTDEE(tmb: number, nivelActividad: string): number {
    const factores: Record<string, number> = {
      SEDENTARIO: 1.2,
      LIGERO: 1.375,
      MODERADO: 1.55,
      INTENSO: 1.725,
      ATLETA: 1.9,
    };
    // Por fallback usamos 1.2
    return tmb * (factores[nivelActividad] || 1.2);
  }

  /**
   * Calcula las calorías objetivo según el objetivo del usuario.
   */
  calcularCaloriasObjetivo(tdee: number, objetivo: string): number {
    switch (objetivo) {
      case 'PERDER_GRASA':
        return tdee - 500;
      case 'GANAR_MUSCULO':
        return tdee + 400; // Tomamos el promedio de 300-500
      case 'MANTENER':
      default:
        return tdee;
    }
  }

  /**
   * Calcula el Target de Macros sugerido.
   * Proteína: 1.8g - 2.2g por kg (usamos 2g promedio).
   * Grasas: 0.8g - 1g por kg (usamos 1g promedio).
   * Carbohidratos: El resto.
   */
  calcularMacrosSugiere(
    caloriasObjetivo: number,
    pesoKg: number,
  ): { proteinasG: number; grasasG: number; carbsG: number } {
    const proteinasG = Math.round(pesoKg * 2);
    const grasasG = Math.round(pesoKg * 1);

    // Proteínas: 4 kcal/g, Grasas: 9 kcal/g, Carbs: 4 kcal/g
    const proteinasKcal = proteinasG * 4;
    const grasasKcal = grasasG * 9;
    const caloriasRestantes = caloriasObjetivo - (proteinasKcal + grasasKcal);
    const carbsG = Math.max(0, Math.round(caloriasRestantes / 4));

    return { proteinasG, grasasG, carbsG };
  }

  getPerfilNutricional(user: Usuario) {
    if (!user.pesoCorporalKg || !user.alturaCm || !user.fechaNacimiento || !user.sexo) {
      return {
        calculoDisponible: false,
        peso: user.pesoCorporalKg ? Number(user.pesoCorporalKg) : null,
      };
    }

    const hoy = new Date();
    const nacimiento = new Date(user.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    // Cálculo preciso de edad según el Tech Lead (si no ha llegado el mes, o si es el mes pero no el día)
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    const tmb = this.calcularTMB(
      Number(user.pesoCorporalKg),
      user.alturaCm,
      edad,
      user.sexo,
    );
    const tdee = this.calcularTDEE(tmb, user.nivelActividad || 'SEDENTARIO');
    const caloriasObjetivo = this.calcularCaloriasObjetivo(
      tdee,
      user.objetivo || 'MANTENER',
    );
    const macros = this.calcularMacrosSugiere(caloriasObjetivo, Number(user.pesoCorporalKg));

    return {
      calculoDisponible: true,
      peso: Number(user.pesoCorporalKg),
      tmb: Math.round(tmb),
      tdee: Math.round(tdee),
      caloriasObjetivo: Math.round(caloriasObjetivo),
      macros: {
        proteinas: macros.proteinasG,
        grasas: macros.grasasG,
        carbohidratos: macros.carbsG,
      },
      objetivo: user.objetivo,
      nivelActividad: user.nivelActividad,
    };
  }
}

