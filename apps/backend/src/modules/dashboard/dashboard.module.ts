import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PlanNutricionalModule } from '../plan-nutricional/plan-nutricional.module';
import { EntrenamientoModule } from '../entrenamiento/entrenamiento.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PlanNutricionalModule,
    EntrenamientoModule,
    RecordsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
