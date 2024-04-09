import bcrypt from 'bcryptjs'

import { IPasswordCrypto } from "./password.crypto";

export class PasswordBcrypt implements IPasswordCrypto{
    hash(password: string): Promise<string>{
        return bcrypt.hash(password, 8)
    }

    async compare(password: string, passwordHash: string): Promise<boolean> {
        const isEquals = await bcrypt.compare(password, passwordHash)
        return isEquals
    }
}