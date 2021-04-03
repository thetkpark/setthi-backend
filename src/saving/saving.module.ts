import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SavingController } from './saving.controller'
import { SavingService } from './saving.service'

@Module({
	controllers: [SavingController],
	providers: [SavingService, PrismaService],
	exports: [SavingService],
})
export class SavingModule {}
