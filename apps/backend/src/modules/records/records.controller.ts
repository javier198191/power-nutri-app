import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Records Personales')
@ApiBearerAuth()
@Controller('records')
@UseGuards(JwtAuthGuard)
export class RecordsController {


  constructor(private readonly recordsService: RecordsService) {}

  @ApiOperation({ summary: 'Consultar todos mis Récords Personales (PRs)' })
  @Get('me')
  async getMyRecords(@Req() req: any) {
    return this.recordsService.getMyRecords(req.user.userId);
  }

  @ApiOperation({ summary: 'Ver la evolución histórica en un ejercicio específico' })
  @Get('progreso/:ejercicioId')
  async getProgreso(@Req() req: any, @Param('ejercicioId') ejercicioId: string) {
    return this.recordsService.getProgreso(req.user.userId, ejercicioId);
  }
}

