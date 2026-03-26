import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('records')
@UseGuards(JwtAuthGuard)
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get('me')
  async getMyRecords(@Req() req: any) {
    return this.recordsService.getMyRecords(req.user.userId);
  }

  @Get('progreso/:ejercicioId')
  async getProgreso(@Req() req: any, @Param('ejercicioId') ejercicioId: string) {
    return this.recordsService.getProgreso(req.user.userId, ejercicioId);
  }
}
