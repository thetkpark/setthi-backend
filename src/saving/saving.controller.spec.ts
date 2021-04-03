import { Test, TestingModule } from '@nestjs/testing';
import { SavingController } from './saving.controller';

describe('SavingController', () => {
  let controller: SavingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingController],
    }).compile();

    controller = module.get<SavingController>(SavingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
