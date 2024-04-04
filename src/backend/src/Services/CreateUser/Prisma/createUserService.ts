import { CustomError } from '../../../errors/custom.error';
import prismaClient from '../../../prisma'

import { hash } from "bcryptjs"

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute( { name, email, password}: UserRequest){
        
        //Check if admin inserted email
        if(!email || !password || !name){
            throw new CustomError("Missing information", 400)
        }

        //Check if email is already registered
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new CustomError("User already exists", 400)
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { CreateUserService }