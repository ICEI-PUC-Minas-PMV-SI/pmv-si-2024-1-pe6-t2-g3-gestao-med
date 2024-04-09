import { CustomError } from '../../../errors/custom.error';
import prismaClient from '../../../prisma'

import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserInMemory {
    async execute(data: UserRequest) {

        //Check if admin inserted email
        if (!data.email || !data.password || !data.name) {
            throw new CustomError("Missing information", 400)
        }

        //Check if email is already registered
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (userAlreadyExists) {
            throw new CustomError("User already exists", 400)
        }

        const passwordHash = await hash(data.password, 8)

        let user: UserRequest[] = []

        user.push(data)

        return user
    
    }
}

export { CreateUserInMemory }