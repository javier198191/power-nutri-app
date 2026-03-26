import { Module } from '@nestjs/common';
import { AlimentosService } from './alimentos.service';
import { AlimentosController } from './alimentos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AlimentosController],
  providers: [AlimentosService],
})
export class AlimentosModule {}
