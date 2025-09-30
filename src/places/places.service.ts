import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placesRepository: Repository<Place>,
  ) {}

  findAll(): Promise<Place[]> {
    return this.placesRepository.find();
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placesRepository.findOneBy({ id });
    if (!place) {
      throw new Error(`Place with ID ${id} not found`);
    }
    return place;
  }

  async create(createDto: CreatePlaceDto): Promise<Place> {
    const place = this.placesRepository.create(createDto);
    return this.placesRepository.save(place);
  }

  async update(id: string, updateDto: UpdatePlaceDto): Promise<Place> {
    await this.placesRepository.update(id, updateDto);
    const updated = await this.findOne(id);
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.placesRepository.delete(id);
  }
}
