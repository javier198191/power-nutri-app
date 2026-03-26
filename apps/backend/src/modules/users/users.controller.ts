import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any) {
    // req.user es inyectado por Passport tras validar el JWT
    return this.usersService.findOne(req.user.userId);
  }
}

