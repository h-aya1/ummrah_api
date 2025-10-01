import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dua } from './entities/dua.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DuasService {
  constructor(
    @InjectRepository(Dua)
    private duasRepository: Repository<Dua>,
  ) {}

  findAll(search?: string): Promise<Dua[]> {
    if (search) {
      return this.duasRepository.createQueryBuilder('dua')
        .where('dua.arabic LIKE :search OR dua.title LIKE :search', { search: `%${search}%` })
        .getMany();
    }
    return this.duasRepository.find();
  }

  findOne(id: string): Promise<Dua | null> {
    return this.duasRepository.findOneBy({ id });
  }

  async create(createDto: any, file: Express.Multer.File): Promise<Dua> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    createDto.audio = `uploads/${fileName}`;
    const dua = this.duasRepository.create(createDto);
    return this.duasRepository.save(dua) as unknown as Promise<Dua>;
  }

  async update(id: string, updateDto: any, file?: Express.Multer.File): Promise<Dua | null> {
    if (file) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      updateDto.audio = `uploads/${fileName}`;
    }
    await this.duasRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.duasRepository.delete(id);
  }
}