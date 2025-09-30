import { Module } from '@nestjs/common';
import { DuasService } from './duas.service';
import { DuasController } from './duas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dua } from './entities/dua.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dua])],
  providers: [DuasService],
  controllers: [DuasController],
})
export class DuasModule {}