import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAlimentoDto {
  @ApiProperty({ example: 'Pechuga de Pollo' })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({ example: 23.5 })
  @IsNumber()
  proteinaG!: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  carbohidratosG!: number;

  @ApiProperty({ example: 2.5 })
  @IsNumber()
  grasasG!: number;

  @ApiProperty({ example: 12000 })
  @IsInt()
  precioPromedioCop!: number;

  @ApiProperty({ example: 'Kg' })
  @IsString()
  @IsNotEmpty()
  unidadMedida!: string;
}

