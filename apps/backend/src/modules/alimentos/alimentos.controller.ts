import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AlimentosService } from './alimentos.service';
import { CreateAlimentoDto } from './dto/create-alimento.dto';
import { UpdateAlimentoDto } from './dto/update-alimento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Base de Datos de Alimentos')
@ApiBearerAuth()
@Controller('alimentos')
@UseGuards(JwtAuthGuard)
export class AlimentosController {


  constructor(private readonly alimentosService: AlimentosService) {}

  @ApiOperation({ summary: 'Registrar un nuevo alimento en el sistema' })
  @Post()
  create(@Body() createAlimentoDto: CreateAlimentoDto) {
    return this.alimentosService.create(createAlimentoDto);
  }

  @ApiOperation({ summary: 'Listar todos los alimentos disponibles' })
  @Get()
  findAll() {
    return this.alimentosService.findAll();
  }

  @ApiOperation({ summary: 'Obtener información nutricional de un alimento por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alimentosService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar valores nutricionales o precio de un alimento' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlimentoDto: UpdateAlimentoDto) {
    return this.alimentosService.update(id, updateAlimentoDto);
  }

  @ApiOperation({ summary: 'Eliminar un alimento del sistema' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alimentosService.remove(id);
  }
}

