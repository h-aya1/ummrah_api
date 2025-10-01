import { Module } from '@nestjs/common';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './entities/guide.entity';
import { Step } from './entities/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guide, Step])],
  providers: [GuideService],
  controllers: [GuideController],
})
export class GuideModule {}