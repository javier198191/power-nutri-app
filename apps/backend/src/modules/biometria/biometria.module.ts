import { Module, forwardRef } from '@nestjs/common';
import { BiometriaService } from './biometria.service';
import { BiometriaController } from './biometria.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [BiometriaController],
  providers: [BiometriaService],
  exports: [BiometriaService],
})
export class BiometriaModule {}

