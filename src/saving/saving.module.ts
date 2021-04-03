import { Module } from '@nestjs/common';
import { SavingController } from './saving.controller';
import { SavingService } from './saving.service';

@Module({
  controllers: [SavingController],
  providers: [SavingService]
})
export class SavingModule {}
