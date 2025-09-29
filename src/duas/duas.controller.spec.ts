import { Test, TestingModule } from '@nestjs/testing';
import { DuasController } from './duas.controller';

describe('DuasController', () => {
  let controller: DuasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuasController],
    }).compile();

    controller = module.get<DuasController>(DuasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
