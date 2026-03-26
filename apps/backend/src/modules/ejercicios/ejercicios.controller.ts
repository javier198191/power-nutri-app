import { Controller, Get, UseGuards } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ejercicios')
@UseGuards(JwtAuthGuard)
export class EjerciciosController {
  constructor(private readonly ejerciciosService: EjerciciosService) {}

  @Get()
  findAll() {
    return this.ejerciciosService.findAll();
  }
}
