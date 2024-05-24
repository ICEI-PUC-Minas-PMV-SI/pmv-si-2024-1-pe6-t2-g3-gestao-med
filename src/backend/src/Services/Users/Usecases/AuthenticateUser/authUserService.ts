import { CustomError } from '../../../../errors/custom.error';
import { IUsersRepository } from '../../Repositories/users.repository';
import { IPasswordCrypto } from '../../../../shared/crypto/password.crypto';
import { IToken } from '../../../../shared/token/token';

export interface AuthRequest {
    email: string,
    password: string
}

class AuthUserService {
    constructor(
        private userRepository: IUsersRepository,
        private passwordCrypto: IPasswordCrypto,
        private token: IToken
    ) { }

    async execute({ email, password }: AuthRequest) {
        if (!email) throw new CustomError("Email is required", 400)
        if (!password) throw new CustomError("Password is required", 400)
        //check if email exists
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new CustomError("Email/password incorrect", 400)

        //check if password is correct
        const passwordMatch = await this.passwordCrypto.compare(password, user.password)

        if (!passwordMatch) throw new CustomError("Email/password incorrect", 400)

        const token = await this.token.create(user)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            token: token
        }

    }
}

export { AuthUserService }