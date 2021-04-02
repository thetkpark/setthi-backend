import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TransactionService } from './transaction.service'

@Module({
	providers: [TransactionService, PrismaService],
})
export class TransactionModule {}
