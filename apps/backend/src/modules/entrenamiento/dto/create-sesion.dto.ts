import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class SerieDto {
  @IsString()
  @IsNotEmpty()
  ejercicioId!: string;

  @IsNumber()
  @Min(0)
  pesoKg!: number;

  @IsInt()
  @Min(1)
  repeticiones!: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  rpe!: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(10)
  rir?: number;
}


export class CreateSesionDto {
  @IsString()
  @IsOptional()
  mesocicloId?: string;

  @IsNumber()
  @IsOptional()
  pesoCorporalDia?: number;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SerieDto)
  series!: SerieDto[];
}
