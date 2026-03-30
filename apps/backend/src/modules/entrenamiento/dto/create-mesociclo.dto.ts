import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMesocicloDto {
  @ApiProperty({ example: 'Bloque de Fuerza 1' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: '2026-04-01' })
  @IsDateString()
  @IsNotEmpty()
  fechaInicio!: string;
}

