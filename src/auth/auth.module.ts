import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { MailgunModule } from '@nextnm/nestjs-mailgun'

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { algorithm: 'HS256', audience: 'mobile-user' },
		}),
		MailgunModule.forRoot({
			API_KEY: process.env.MAILGUN_API_KEY,
			DOMAIN: process.env.MAILGUN_DOMAIN,
		}),
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
