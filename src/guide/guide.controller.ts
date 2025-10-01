import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GuideService } from './guide.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get()
  findAll() {
    return this.guideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guideService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]))
  @Post()
  create(@Body() createDto: CreateGuideDto, @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] }) {
    return this.guideService.create(createDto, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGuideDto, @UploadedFiles() files?: { [fieldname: string]: Express.Multer.File[] }) {
    return this.guideService.update(id, updateDto, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guideService.remove(id);
  }

  // Steps
  @Get('steps')
  findAllSteps(@Query('guideId') guideId?: string) {
    return this.guideService.findAllSteps(guideId);
  }

  @Get('steps/:id')
  findStep(@Param('id') id: string) {
    return this.guideService.findStep(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]))
  @Post('steps')
  createStep(@Body() createDto: CreateStepDto, @UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] }) {
    return this.guideService.createStep(createDto, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]))
  @Put('steps/:id')
  updateStep(@Param('id') id: string, @Body() updateDto: UpdateStepDto, @UploadedFiles() files?: { [fieldname: string]: Express.Multer.File[] }) {
    return this.guideService.updateStep(id, updateDto, files);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('steps/:id')
  removeStep(@Param('id') id: string) {
    return this.guideService.removeStep(id);
  }
}