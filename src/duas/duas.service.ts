import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dua } from './entities/dua.entity';

@Injectable()
export class DuasService {
  constructor(
    @InjectRepository(Dua)
    private duasRepository: Repository<Dua>,
  ) {}

  findAll(search?: string): Promise<Dua[]> {
    if (search) {
      return this.duasRepository.createQueryBuilder('dua')
        .where('dua.arabic LIKE :search OR dua.transliteration LIKE :search', { search: `%${search}%` })
        .getMany();
    }
    return this.duasRepository.find();
  }

  findOne(id: string): Promise<Dua | null> {
    return this.duasRepository.findOneBy({ id });
  }

  async create(createDto: any): Promise<Dua> {
    const dua = this.duasRepository.create(createDto);
    return this.duasRepository.save(dua) as unknown as Promise<Dua>;
  }

  async update(id: string, updateDto: any): Promise<Dua | null> {
    await this.duasRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.duasRepository.delete(id);
  }
}