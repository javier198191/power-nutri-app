import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateNutricionLogDto {
  @ApiProperty({ example: 2500, description: 'Calorías totales consumidas en el día' })
  @IsNumber()
  @IsNotEmpty()
  caloriasConsumidas!: number;

  @ApiProperty({ example: 180, description: 'Gramos de proteína' })
  @IsNumber()
  @IsNotEmpty()
  proteinaG!: number;

  @ApiProperty({ example: 200, description: 'Gramos de carbohidratos' })
  @IsNumber()
  @IsNotEmpty()
  carbosG!: number;

  @ApiProperty({ example: 70, description: 'Gramos de grasa' })
  @IsNumber()
  @IsNotEmpty()
  grasasG!: number;

  @ApiProperty({ example: 'uuid-del-plan', required: false, description: 'ID del plan nutricional seguido' })
  @IsString()
  @IsOptional()
  planNutricionalId?: string;

  @ApiProperty({ example: 2.5, description: 'Litros de agua consumidos', required: false })
  @IsNumber()
  @IsOptional()
  aguaLitros?: number;

  @ApiProperty({ example: 'Hoy tuve un cheat meal en la cena.', required: false })
  @IsString()
  @IsOptional()
  comentarios?: string;
}

