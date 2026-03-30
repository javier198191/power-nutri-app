import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { PrismaDecimalInterceptor } from './common/interceptors/prisma-decimal.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Implementación del principio "Fail Fast" con ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true 
  }));

<<<<<<< HEAD
  // Habilitar CORS para el frontend en el puerto 3003
  app.enableCors({
    origin: ['http://localhost:3003'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

=======
  // Exigencia Técnica: Interceptor y Filtro Global
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new PrismaDecimalInterceptor());

  // Servir archivos estáticos (Progreso Físico)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });


  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('PowerNutri API')
    .setDescription('API para automatizar la nutrición y el entrenamiento')
    .setVersion('1.0')
    .addBearerAuth() // Soporte para JWT si es necesario
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

>>>>>>> f8d9295 (v1.0)
  const port = 3002;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📑 Swagger documented at: http://localhost:${port}/api`);
}
bootstrap();