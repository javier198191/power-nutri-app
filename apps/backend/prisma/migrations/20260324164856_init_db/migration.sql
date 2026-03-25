-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "pesoCorporalKg" DECIMAL(5,2) NOT NULL,
    "presupuestoSemanalCop" INTEGER NOT NULL,
    "estadoActivo" BOOLEAN NOT NULL DEFAULT true,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesociclo" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Mesociclo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SesionEntrenamiento" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "mesocicloId" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pesoCorporalDia" DECIMAL(5,2),
    "notas" TEXT,

    CONSTRAINT "SesionEntrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "esBasico" BOOLEAN NOT NULL DEFAULT false,
    "grupoMuscular" TEXT NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Serie" (
    "id" TEXT NOT NULL,
    "sesionId" TEXT NOT NULL,
    "ejercicioId" TEXT NOT NULL,
    "pesoKg" DECIMAL(6,2) NOT NULL,
    "repeticiones" INTEGER NOT NULL,
    "rpe" DECIMAL(3,1),
    "esRecordPersonal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alimento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "proteinaG" DECIMAL(5,2) NOT NULL,
    "carbohidratosG" DECIMAL(5,2) NOT NULL,
    "grasasG" DECIMAL(5,2) NOT NULL,
    "precioPromedioCop" INTEGER NOT NULL,
    "unidadMedida" TEXT NOT NULL,

    CONSTRAINT "Alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanNutricional" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costoTotalEstimadoCop" INTEGER NOT NULL,
    "totalCalorias" DECIMAL(6,2) NOT NULL,

    CONSTRAINT "PlanNutricional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanAlimento" (
    "planId" TEXT NOT NULL,
    "alimentoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "PlanAlimento_pkey" PRIMARY KEY ("planId","alimentoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ejercicio_nombre_key" ON "Ejercicio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Alimento_nombre_key" ON "Alimento"("nombre");

-- AddForeignKey
ALTER TABLE "Mesociclo" ADD CONSTRAINT "Mesociclo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionEntrenamiento" ADD CONSTRAINT "SesionEntrenamiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SesionEntrenamiento" ADD CONSTRAINT "SesionEntrenamiento_mesocicloId_fkey" FOREIGN KEY ("mesocicloId") REFERENCES "Mesociclo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Serie" ADD CONSTRAINT "Serie_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "SesionEntrenamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Serie" ADD CONSTRAINT "Serie_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanNutricional" ADD CONSTRAINT "PlanNutricional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAlimento" ADD CONSTRAINT "PlanAlimento_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanNutricional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanAlimento" ADD CONSTRAINT "PlanAlimento_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "Alimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
