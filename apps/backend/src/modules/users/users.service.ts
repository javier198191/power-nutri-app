import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { BiometriaService } from '../biometria/biometria.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly biometriaService: BiometriaService,
  ) {}

  async getNutritionalProfile(userId: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error('Usuario no encontrado');

    return this.biometriaService.getPerfilNutricional(user);
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    // Convertir a DateTime si viene fecha
    const data: any = { ...updateProfileDto };
    if (data.fechaNacimiento) {
      data.fechaNacimiento = new Date(data.fechaNacimiento);
    }

    const user = await this.prisma.usuario.update({
      where: { id: userId },
      data,
    });

    // Retorna el perfil nutricional actualizado como retroalimentación inmediata
    return this.biometriaService.getPerfilNutricional(user);
  }



  async create(registerDto: RegisterDto) {
    const { password, ...others } = registerDto;
    
    // Hash the password with bcrypt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await this.prisma.usuario.create({
      data: {
        ...others,
        passwordHash,
      },
    });

    // Remove passwordHash from the returned user object
    const { passwordHash: _, ...result } = user;

    // Convertir Decimal de Prisma a Number de JS
    return {
      ...result,
      pesoCorporalKg: result.pesoCorporalKg.toNumber(),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { passwordHash, ...result } = user;
    return {
      ...result,
      pesoCorporalKg: result.pesoCorporalKg.toNumber(),
    };
  }
}



