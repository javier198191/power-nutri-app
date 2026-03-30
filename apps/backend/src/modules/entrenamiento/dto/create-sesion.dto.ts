import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class SerieDto {
  @ApiProperty({ example: 'uuid-ejercicio-1' })
  @IsString()
  @IsNotEmpty()
  ejercicioId!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  pesoKg!: number;

  @ApiProperty({ example: 8 })
  @IsInt()
  @Min(1)
  repeticiones!: number;

  @ApiProperty({ example: 8.5, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  rpe!: number;

  @ApiProperty({ example: 1, minimum: 0, maximum: 10, required: false })
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(10)
  rir?: number;
}


export class CreateSesionDto {
  @ApiProperty({ example: 'uuid-mesociclo-activo', required: false })
  @IsString()
  @IsOptional()
  mesocicloId?: string;

  @ApiProperty({ example: 80.5, required: false })
  @IsNumber()
  @IsOptional()
  pesoCorporalDia?: number;

  @ApiProperty({ example: 'Buen entrenamiento el de hoy', required: false })
  @IsString()
  @IsOptional()
  notas?: string;

  @ApiProperty({ type: [SerieDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SerieDto)
  series!: SerieDto[];
}

