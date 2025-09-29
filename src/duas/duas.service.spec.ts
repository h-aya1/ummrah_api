import { Test, TestingModule } from '@nestjs/testing';
import { DuasService } from './duas.service';

describe('DuasService', () => {
  let service: DuasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuasService],
    }).compile();

    service = module.get<DuasService>(DuasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
