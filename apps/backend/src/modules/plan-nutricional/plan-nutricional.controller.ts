import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { PlanNutricionalService } from './plan-nutricional.service';
import { CreatePlanNutricionalDto } from './dto/create-plan-nutricional.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plan-nutricional')
@UseGuards(JwtAuthGuard)
export class PlanNutricionalController {
  constructor(private readonly planService: PlanNutricionalService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreatePlanNutricionalDto) {
    return this.planService.create(req.user.userId, dto);
  }

  @Get('ultimo')
  async getLatest(@Req() req: any) {
    return this.planService.findLatest(req.user.userId);
  }
}
