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
import { LabelModule } from './label/label.module'
import { CategoryModule } from './category/category.module'
import { SavingModule } from './saving/saving.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerModule.forRoot({
			ttl: 3,
			limit: 50,
		}),
		UsersModule,
		AuthModule,
		TransactionModule,
		WalletModule,
		LabelModule,
		CategoryModule,
		SavingModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		TransactionService,
		PrismaService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
