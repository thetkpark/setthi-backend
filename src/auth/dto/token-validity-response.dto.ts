import { ApiProperty } from '@nestjs/swagger'

export class TokenValidityResponse {
	@ApiProperty()
	token_validity: boolean
}
