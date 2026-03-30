import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class AlimentoItemDto {
  @ApiProperty({ example: 'uuid-de-alimento' })
  @IsString()
  @IsNotEmpty()
  alimentoId!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  cantidad!: number;
}

export class CreatePlanNutricionalDto {
  @ApiProperty({ type: [AlimentoItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AlimentoItemDto)
  alimentos!: AlimentoItemDto[];
}

