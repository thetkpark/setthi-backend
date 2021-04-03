import { Test, TestingModule } from '@nestjs/testing';
import { SavingService } from './saving.service';

describe('SavingService', () => {
  let service: SavingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingService],
    }).compile();

    service = module.get<SavingService>(SavingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
