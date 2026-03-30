import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlanNutricionalService } from './plan-nutricional.service';
import { CreatePlanNutricionalDto } from './dto/create-plan-nutricional.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Nutrición')
@ApiBearerAuth()
@Controller('plan-nutricional')
@UseGuards(JwtAuthGuard)
export class PlanNutricionalController {


  constructor(private readonly planService: PlanNutricionalService) {}

  @ApiOperation({ summary: 'Crear un nuevo menú o plan de alimentación' })
  @Post()
  async create(@Req() req: any, @Body() dto: CreatePlanNutricionalDto) {
    return this.planService.create(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Consultar el plan de alimentación más reciente' })
  @Get('ultimo')
  async getLatest(@Req() req: any) {
    return this.planService.findLatest(req.user.userId);
  }
}

