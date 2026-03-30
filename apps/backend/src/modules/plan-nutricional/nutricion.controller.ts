import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PlanNutricionalService } from './plan-nutricional.service';
import { CreateNutricionLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Nutrición - Logs Diarios')
@ApiBearerAuth()
@Controller('nutricion')
@UseGuards(JwtAuthGuard)
export class NutricionController {
  constructor(private readonly planService: PlanNutricionalService) {}

  @ApiOperation({ summary: 'Registrar la comida consumida en el día' })
  @Post('diario')
  async createLog(@Req() req: any, @Body() dto: CreateNutricionLogDto) {
    return this.planService.createLog(req.user.userId, dto);
  }
}
