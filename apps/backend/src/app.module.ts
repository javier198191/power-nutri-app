import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlimentosModule } from './modules/alimentos/alimentos.module';
import { PlanNutricionalModule } from './modules/plan-nutricional/plan-nutricional.module';
import { EjerciciosModule } from './modules/ejercicios/ejercicios.module';
import { EntrenamientoModule } from './modules/entrenamiento/entrenamiento.module';
import { RecordsModule } from './modules/records/records.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    AlimentosModule,
    PlanNutricionalModule,
    EjerciciosModule,
    EntrenamientoModule,
    RecordsModule,
    DashboardModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






