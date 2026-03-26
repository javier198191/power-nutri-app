import { IsNumber, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAlimentoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsNumber()
  proteinaG!: number;

  @IsNumber()
  carbohidratosG!: number;

  @IsNumber()
  grasasG!: number;

  @IsInt()
  precioPromedioCop!: number;

  @IsString()
  @IsNotEmpty()
  unidadMedida!: string;
}
