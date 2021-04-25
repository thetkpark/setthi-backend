import { forwardRef, Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TransactionModule } from 'src/transaction/transaction.module'
import { WalletModule } from 'src/wallet/wallet.module'
import { SavingController } from './saving.controller'
import { SavingService } from './saving.service'

@Module({
	imports: [WalletModule, forwardRef(() => TransactionModule)],
	controllers: [SavingController],
	providers: [SavingService, PrismaService],
	exports: [SavingService],
})
export class SavingModule {}
