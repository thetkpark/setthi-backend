import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { TransactionService } from './transaction/transaction.service'
import { TransactionModule } from './transaction/transaction.module'
import { PrismaService } from './prisma.service'
import { WalletModule } from './wallet/wallet.module'
import { LabelModule } from './label/label.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
		TransactionModule,
		WalletModule,
		LabelModule,
	],
	controllers: [AppController],
	providers: [AppService, TransactionService, PrismaService],
})
export class AppModule {}
