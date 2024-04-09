
import { UserAuthDTO } from "../../Services/Users/UserDto/user.dto"

export type TokenUser = {
    sub: string
}

export interface IToken{
    create(user: UserAuthDTO): string
    validate(token: string): TokenUser | null
}