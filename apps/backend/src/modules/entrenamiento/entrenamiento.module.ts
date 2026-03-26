import { Module } from '@nestjs/common';
import { EntrenamientoService } from './entrenamiento.service';
import { EntrenamientoController } from './entrenamiento.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [PrismaModule, AuthModule, RecordsModule],
  controllers: [EntrenamientoController],
  providers: [EntrenamientoService],
  exports: [EntrenamientoService],
})
export class EntrenamientoModule {}


