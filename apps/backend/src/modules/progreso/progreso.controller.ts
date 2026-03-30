import { Controller, Post, Get, Body, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ProgresoService } from './progreso.service';
import { CreateProgresoDto } from './dto/create-progreso.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Servicio genérico local para guardar subidas en disco "uploads/progreso"
const storage = diskStorage({
  destination: './uploads/progreso',
  filename: (req, file, cb) => {
    // Generar un nombre único aleatorio para no sobreescribir
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

@ApiTags('Progreso Físico')
@ApiBearerAuth()
@Controller('progreso')
@UseGuards(JwtAuthGuard)
export class ProgresoController {
  constructor(private readonly progresoService: ProgresoService) {}

  @ApiOperation({ summary: 'Registrar progreso diario con foto opcional' })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('foto', {
    storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new BadRequestException('Solo se permiten imágenes (jpg, jpeg, png)'), false);
      }
      cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de 5MB
  }))
  async createProgreso(
    @Req() req: any, 
    @Body() dto: CreateProgresoDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const urlFoto = file ? `/uploads/progreso/${file.filename}` : undefined;
    return this.progresoService.create(req.user.userId, dto, urlFoto);
  }

  @ApiOperation({ summary: 'Obtener el historial completo de la evolución visual y pesos' })
  @Get('historial')
  async getHistorial(@Req() req: any) {
    return this.progresoService.getHistorial(req.user.userId);
  }
}
