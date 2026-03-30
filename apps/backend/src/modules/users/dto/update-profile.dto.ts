import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsEnum, IsDateString, Min, Max, IsString } from 'class-validator';
import { NivelActividad, Objetivo } from '@prisma/client';

export class UpdateProfileDto {
  @ApiProperty({ example: 180, required: false, minimum: 50, maximum: 250 })
  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(250)
  alturaCm?: number;

  @ApiProperty({ example: 80, required: false, minimum: 20, maximum: 300 })
  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(300)
  pesoCorporalKg?: number;

  @ApiProperty({ example: '1995-06-15', required: false })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @ApiProperty({ example: 'H', required: false })
  @IsOptional()
  @IsString()
  sexo?: string;

  @ApiProperty({ enum: NivelActividad, required: false })
  @IsOptional()
  @IsEnum(NivelActividad)
  nivelActividad?: NivelActividad;

  @ApiProperty({ enum: Objetivo, required: false })
  @IsOptional()
  @IsEnum(Objetivo)
  objetivo?: Objetivo;
}

