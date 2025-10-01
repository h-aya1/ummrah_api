import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DuasService } from './duas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';  // Create this for role checks
import { Roles } from '../auth/roles.decorator';  // Create decorator
import { CreateDuaDto } from './dto/create-dua.dto';
import { UpdateDuaDto } from './dto/update-dua.dto';

@Controller('duas')
export class DuasController {
  constructor(private readonly duasService: DuasService) {}

  @Get()
  findAll(@Query('search') search: string) {
    return this.duasService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.duasService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('audio'))
  @Post()
  create(@Body() createDto: CreateDuaDto, @UploadedFile() file: Express.Multer.File) {
    return this.duasService.create(createDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('audio'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDuaDto, @UploadedFile() file?: Express.Multer.File) {
    return this.duasService.update(id, updateDto, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duasService.remove(id);
  }
}