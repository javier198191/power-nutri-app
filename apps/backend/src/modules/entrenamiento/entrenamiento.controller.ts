import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EntrenamientoService } from './entrenamiento.service';
import { CreateMesocicloDto } from './dto/create-mesociclo.dto';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Entrenamiento')
@ApiBearerAuth()
@Controller('entrenamiento')
@UseGuards(JwtAuthGuard)
export class EntrenamientoController {


  constructor(private readonly entrenamientoService: EntrenamientoService) {}

  @ApiOperation({ summary: 'Crear un nuevo mesociclo (bloque de entrenamiento)' })
  @Post('mesociclo')
  createMesociclo(@Req() req: any, @Body() dto: CreateMesocicloDto) {
    return this.entrenamientoService.createMesociclo(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Obtener el mesociclo que se encuentra activo' })
  @Get('mesociclo/activo')
  getMesocicloActivo(@Req() req: any) {
    return this.entrenamientoService.getMesocicloActivo(req.user.userId);
  }

  @ApiOperation({ summary: 'Registrar una sesión de entrenamiento finalizada' })
  @Post('sesion')
  registerSesion(@Req() req: any, @Body() dto: CreateSesionDto) {
    return this.entrenamientoService.registerSesion(req.user.userId, dto);
  }
}

