import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';
import { Step } from './entities/step.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private guidesRepository: Repository<Guide>,
    @InjectRepository(Step)
    private stepsRepository: Repository<Step>,
  ) {}

  async findAll(): Promise<Guide[]> {
    return this.guidesRepository.find({ relations: ['steps'], order: { order: 'ASC' } });
  }

  async findOne(id: string): Promise<Guide | null> {
    return this.guidesRepository.findOne({ where: { id }, relations: ['steps'] });
  }

  async create(createDto: any, files: { [fieldname: string]: Express.Multer.File[] }): Promise<Guide> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    createDto.media = createDto.media || {};

    if (files.image && files.image[0]) {
      const fileName = `${Date.now()}-guide-image-${files.image[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.image[0].buffer);
      createDto.media.image = `uploads/${fileName}`;
    }

    if (files.video && files.video[0]) {
      const fileName = `${Date.now()}-guide-video-${files.video[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.video[0].buffer);
      createDto.media.video = `uploads/${fileName}`;
    }

    if (files.audio && files.audio[0]) {
      const fileName = `${Date.now()}-guide-audio-${files.audio[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.audio[0].buffer);
      createDto.media.audio = `uploads/${fileName}`;
    }

    const guide = this.guidesRepository.create(createDto);
    return this.guidesRepository.save(guide) as unknown as Promise<Guide>;
  }

  async update(id: string, updateDto: any, files?: { [fieldname: string]: Express.Multer.File[] }): Promise<Guide | null> {
    if (files) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      updateDto.media = updateDto.media || {};

      if (files.image && files.image[0]) {
        const fileName = `${Date.now()}-guide-image-${files.image[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.image[0].buffer);
        updateDto.media.image = `uploads/${fileName}`;
      }

      if (files.video && files.video[0]) {
        const fileName = `${Date.now()}-guide-video-${files.video[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.video[0].buffer);
        updateDto.media.video = `uploads/${fileName}`;
      }

      if (files.audio && files.audio[0]) {
        const fileName = `${Date.now()}-guide-audio-${files.audio[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.audio[0].buffer);
        updateDto.media.audio = `uploads/${fileName}`;
      }
    }

    await this.guidesRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.guidesRepository.delete(id);
  }

  // Steps
  async findAllSteps(guideId?: string): Promise<Step[]> {
    const where = guideId ? { guideId } : {};
    return this.stepsRepository.find({ where, relations: ['guide'] });
  }

  async findStep(id: string): Promise<Step | null> {
    return this.stepsRepository.findOne({ where: { id }, relations: ['guide'] });
  }

  async createStep(createDto: any, files: { [fieldname: string]: Express.Multer.File[] }): Promise<Step> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    if (files.image && files.image[0]) {
      const fileName = `${Date.now()}-step-image-${files.image[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.image[0].buffer);
      createDto.image = `uploads/${fileName}`;
    }

    if (files.video && files.video[0]) {
      const fileName = `${Date.now()}-step-video-${files.video[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.video[0].buffer);
      createDto.video = `uploads/${fileName}`;
    }

    if (files.audio && files.audio[0]) {
      const fileName = `${Date.now()}-step-audio-${files.audio[0].originalname}`;
      fs.writeFileSync(path.join(uploadDir, fileName), files.audio[0].buffer);
      createDto.audio = `uploads/${fileName}`;
    }

    const step = this.stepsRepository.create(createDto);
    return this.stepsRepository.save(step) as unknown as Promise<Step>;
  }

  async updateStep(id: string, updateDto: any, files?: { [fieldname: string]: Express.Multer.File[] }): Promise<Step | null> {
    if (files) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      if (files.image && files.image[0]) {
        const fileName = `${Date.now()}-step-image-${files.image[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.image[0].buffer);
        updateDto.image = `uploads/${fileName}`;
      }

      if (files.video && files.video[0]) {
        const fileName = `${Date.now()}-step-video-${files.video[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.video[0].buffer);
        updateDto.video = `uploads/${fileName}`;
      }

      if (files.audio && files.audio[0]) {
        const fileName = `${Date.now()}-step-audio-${files.audio[0].originalname}`;
        fs.writeFileSync(path.join(uploadDir, fileName), files.audio[0].buffer);
        updateDto.audio = `uploads/${fileName}`;
      }
    }

    await this.stepsRepository.update(id, updateDto);
    return this.findStep(id);
  }

  async removeStep(id: string): Promise<void> {
    await this.stepsRepository.delete(id);
  }
}