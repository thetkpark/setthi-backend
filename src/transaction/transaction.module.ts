import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { WalletModule } from 'src/wallet/wallet.module'
import { SavingModule } from 'src/saving/saving.module'

@Module({
	imports: [WalletModule, SavingModule],
	providers: [TransactionService, PrismaService],
	controllers: [TransactionController],
})
export class TransactionModule {}
