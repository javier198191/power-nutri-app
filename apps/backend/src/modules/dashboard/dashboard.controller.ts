import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {


  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Obtener resumen general: Nutrición (consumo vs meta), Entrenamientos y Fuerza' })
  @Get('summary')
  async getSummary(@Req() req: any) {
    return this.dashboardService.getSummary(req.user.userId);
  }
}

