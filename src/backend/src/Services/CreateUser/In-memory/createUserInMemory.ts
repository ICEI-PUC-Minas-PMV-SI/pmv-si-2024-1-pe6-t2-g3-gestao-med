import { CustomError } from '../../../errors/custom.error';
import prismaClient from '../../../prisma'

import { hash } from "bcryptjs"

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserInMemory{
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

        let items = []

       const user = items.push({id:"1", name, email, password})


       return user
    }
}

export { CreateUserInMemory }