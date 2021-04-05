import { customAlphabet } from 'nanoid'

export const generateResetToken = (): string => {
	const alphabet = '0123456789'
	const nanoid = customAlphabet(alphabet, 6)
	return nanoid()
}
