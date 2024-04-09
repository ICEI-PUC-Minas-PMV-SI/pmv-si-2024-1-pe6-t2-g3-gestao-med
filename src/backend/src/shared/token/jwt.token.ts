import { sign } from 'jsonwebtoken'
import { verify } from 'jsonwebtoken';

import { createHmac } from 'crypto'


import { UserAuthDTO } from '../../Services/Users/UserDto/user.dto';
import { IToken, TokenUser } from "./token";

export class JWTToken implements IToken {
    private TOKEN_SECRET = process.env.JWT_SECRET || ""

    private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')

    create({ isAdmin, id }: UserAuthDTO): string {
        const token = sign({
            user:{
                isAdmin,
                id
            },
        }, this.TOKEN_SECRET_CRYPTO, {
            subject: id,
            expiresIn:'1D'
        })

        return token
    }

    validate(token: string): TokenUser | null{

        try {
            const tokenUser = verify(token, this.TOKEN_SECRET_CRYPTO) as TokenUser
            return tokenUser

        } catch (err) {
            return null
        }
    }

}
