-- AlterTable
ALTER TABLE "Serie" ADD COLUMN     "rir" INTEGER;

-- CreateTable
CREATE TABLE "RecordPersonal" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "ejercicioId" TEXT NOT NULL,
    "pesoMaximo" DECIMAL(6,2) NOT NULL,
    "repeticiones" INTEGER NOT NULL,
    "e1RM" DECIMAL(6,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecordPersonal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecordPersonal" ADD CONSTRAINT "RecordPersonal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordPersonal" ADD CONSTRAINT "RecordPersonal_ejercicioId_fkey" FOREIGN KEY ("ejercicioId") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
