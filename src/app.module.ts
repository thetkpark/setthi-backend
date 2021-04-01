import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
