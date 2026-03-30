import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BiometriaService } from './biometria.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@ApiTags('Biometría Personal')
@ApiBearerAuth()
@Controller('biometria')
@UseGuards(JwtAuthGuard)
export class BiometriaController {
  constructor(
    private readonly biometriaService: BiometriaService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Consultar el perfil nutricional, TDEE y Macros sugeridos' })
  @Get('perfil')
  async getPerfil(@Req() req: any) {
    return this.usersService.getNutritionalProfile(req.user.userId);
  }
}
