import { Module } from '@nestjs/common';
import { PlanNutricionalService } from './plan-nutricional.service';
import { PlanNutricionalController } from './plan-nutricional.controller';
import { NutricionController } from './nutricion.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { BiometriaModule } from '../biometria/biometria.module';

@Module({
  imports: [PrismaModule, AuthModule, BiometriaModule],
  controllers: [PlanNutricionalController, NutricionController],
  providers: [PlanNutricionalService],
  exports: [PlanNutricionalService],
})
export class PlanNutricionalModule {}


