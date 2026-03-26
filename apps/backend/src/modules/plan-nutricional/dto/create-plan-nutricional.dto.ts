import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class AlimentoItemDto {
  @IsString()
  @IsNotEmpty()
  alimentoId!: string;

  @IsInt()
  @Min(1)
  cantidad!: number;
}

export class CreatePlanNutricionalDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlimentoItemDto)
  alimentos!: AlimentoItemDto[];
}
