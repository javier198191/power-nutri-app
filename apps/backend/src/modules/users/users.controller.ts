import { Body, Controller, Post, Get, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario (sin auth)' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  @ApiOperation({ summary: 'Obtener datos básicos del usuario logueado' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    // req.user es inyectado por Passport tras validar el JWT
    return this.usersService.findOne(req.user.userId);
  }

  @ApiOperation({ summary: 'Obtener TDEE y Macros calculados por biometría' })
  @UseGuards(JwtAuthGuard)
  @Get('perfil-nutricional')
  async getNutritionalProfile(@Req() req: any) {
    return this.usersService.getNutritionalProfile(req.user.userId);
  }

  @ApiOperation({ summary: 'Actualizar peso, altura, edad u objetivos físicos' })
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@Req() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, updateProfileDto);
  }
}





