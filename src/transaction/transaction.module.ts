import { forwardRef, Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { WalletModule } from 'src/wallet/wallet.module'
import { SavingModule } from 'src/saving/saving.module'
import { CategoryModule } from 'src/category/category.module'

@Module({
	imports: [WalletModule, forwardRef(() => SavingModule), CategoryModule],
	providers: [TransactionService, PrismaService],
	controllers: [TransactionController],
	exports: [TransactionService],
})
export class TransactionModule {}
