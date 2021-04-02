import { IsNotEmpty, IsString } from 'class-validator'

export class EditWalletDto {
	@IsString()
	@IsNotEmpty()
	name: string
}
