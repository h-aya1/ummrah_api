import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './entities/guide.entity';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  findAll(): Promise<Guide[]> {
    return this.guideRepository.find({ order: { order: 'ASC' } });
  }

  findOne(id: string): Promise<Guide> {
    return this.guideRepository.findOneBy({ id });
  }

  async create(createDto: any): Promise<Guide> {
    const guide = this.guideRepository.create(createDto);
    return this.guideRepository.save(guide);
  }

  async update(id: string, updateDto: any): Promise<Guide> {
    await this.guideRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.guideRepository.delete(id);
  }
}