# 🏋️‍♂️ PowerNutri - Fullstack Biometric & Training Engine

**PowerNutri** es una plataforma de alto rendimiento diseñada para atletas de **Powerbuilding** que buscan optimizar su fuerza y composición corporal mediante datos precisos. No es solo un tracker; es un motor biométrico que integra ciencia nutricional y progresión de cargas en tiempo real.

---

## 🚀 Pilares del Proyecto

### 1. 🧠 Motor Biométrico (Precision Nutrition)
Implementación de la **Ecuación de Mifflin-St Jeor** para el cálculo dinámico de la Tasa Metabólica Basal (TMB) y el Gasto Energético Diario Total (TDEE).
* **Ajuste por Actividad:** Desde sedentario hasta nivel **ATLETA** (Factor 1.9).
* **Gestión de Macros:** Reparto automatizado basado en objetivos (Proteína 2g/kg, Grasas 1g/kg, Carbos restantes).
* **Daily Logs:** Registro diario con feedback inmediato sobre el déficit/superávit calórico.

### 2. ⚡ Powerbuilding Tracker (Force Intelligence)
Sistema de gestión de entrenamiento enfocado en la progresión de cargas.
* **Intensidad Real:** Registro basado en **RPE** (Esfuerzo Percibido) y **RIR** (Repeticiones en Reserva).
* **PR Tracker:** Cálculo automático del **1RM Estimado** (Fórmula de Epley) para detectar récords personales en cada sesión.
* **Evolución Visual:** Historial de fotos de progreso con persistencia de datos y volúmenes Docker.

### 3. 🏗️ Arquitectura de Grado Producción
* **Core:** NestJS + Prisma ORM.
* **Seguridad:** Autenticación blindada con **JWT (Bearer Auth)** integrada en Swagger.
* **DX (Developer Experience):**
    * **Swagger UI:** Documentación interactiva completa en `/api`.
    * **Global Interceptors:** Normalización automática de tipos (Decimal to Number).
    * **Global Filters:** Manejo de excepciones estandarizado (JSON Error Format).

---

## 🛠️ Tech Stack

* **Backend:** NestJS (Node.js)
* **Base de Datos:** PostgreSQL
* **ORM:** Prisma
* **Infraestructura:** Docker & Docker Compose
* **Documentación:** Swagger / OpenAPI 3.0

---

## 📦 Instalación y Despliegue (Quick Start)

Para levantar todo el ecosistema (Base de Datos + API) en un solo comando:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/javier198191/power-nutri-app.git
   cd power-nutri-app
   ```

2. **Configurar variables:**
   Crea un archivo `.env` basado en el `.env.example` en la raíz de `apps/backend`.

3. **Levantar con Docker:**
   ```bash
   docker compose up --build -d
   ```

4. **Acceder a la Documentación:**
   Visita [http://localhost:3002/api](http://localhost:3002/api) para explorar los endpoints y probar la API con el botón **Authorize**.

