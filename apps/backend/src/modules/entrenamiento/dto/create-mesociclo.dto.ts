import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMesocicloDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaInicio!: string;
}
