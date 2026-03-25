import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Registrar el filtro de excepciones global de Prisma
  app.useGlobalFilters(new PrismaExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
