import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@powernutri.com';
  const password = 'PowerNutri2026';
  
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  console.log('🌱 Iniciando seeding...');

  const user = await prisma.usuario.upsert({
    where: { email },
    update: {
      passwordHash,
    },
    create: {
      email,
      passwordHash,
      pesoCorporalKg: 80.0,
      presupuestoSemanalCop: 150000,
      estadoActivo: true,
    },
  });

  console.log(`✅ Usuario creado: ${user.email}`);
  console.log(`🔑 Contraseña: ${password}`);
  console.log('🚀 Seeding completado con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
