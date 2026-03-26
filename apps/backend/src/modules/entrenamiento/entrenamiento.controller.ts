import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { EntrenamientoService } from './entrenamiento.service';
import { CreateMesocicloDto } from './dto/create-mesociclo.dto';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('entrenamiento')
@UseGuards(JwtAuthGuard)
export class EntrenamientoController {
  constructor(private readonly entrenamientoService: EntrenamientoService) {}

  @Post('mesociclo')
  createMesociclo(@Req() req: any, @Body() dto: CreateMesocicloDto) {
    return this.entrenamientoService.createMesociclo(req.user.userId, dto);
  }

  @Get('mesociclo/activo')
  getMesocicloActivo(@Req() req: any) {
    return this.entrenamientoService.getMesocicloActivo(req.user.userId);
  }

  @Post('sesion')
  registerSesion(@Req() req: any, @Body() dto: CreateSesionDto) {
    return this.entrenamientoService.registerSesion(req.user.userId, dto);
  }
}
