import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(registerDto: RegisterDto) {
    const { password, ...others } = registerDto;
    
    const user = await this.prisma.usuario.create({
      data: {
        ...others,
        passwordHash: password, // Hashing would occur here in production
      },
    });

    // Remove passwordHash from the returned user object
    const { passwordHash, ...result } = user;
    return result;
  }
}
