import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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



