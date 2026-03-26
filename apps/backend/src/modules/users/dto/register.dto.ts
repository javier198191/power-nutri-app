import { IsEmail, IsInt, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsNumber()
  pesoCorporalKg!: number;

  @IsInt()
  presupuestoSemanalCop!: number;
}