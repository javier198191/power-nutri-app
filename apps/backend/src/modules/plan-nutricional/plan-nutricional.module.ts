import { Module } from '@nestjs/common';
import { PlanNutricionalService } from './plan-nutricional.service';
import { PlanNutricionalController } from './plan-nutricional.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PlanNutricionalController],
  providers: [PlanNutricionalService],
  exports: [PlanNutricionalService],
})
export class PlanNutricionalModule {}

