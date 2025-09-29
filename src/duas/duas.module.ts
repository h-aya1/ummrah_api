import { Module } from '@nestjs/common';
import { DuasController } from './duas.controller';
import { DuasService } from './duas.service';

@Module({
  controllers: [DuasController],
  providers: [DuasService]
})
export class DuasModule {}
