import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProgresoDto {
  @ApiProperty({ example: 80.5, description: 'Peso corporal en Kg', required: false })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  pesoCorporalKg?: number;

  @ApiProperty({ example: 'Me siento con más energía hoy.', required: false })
  @IsString()
  @IsOptional()
  notas?: string;
}
