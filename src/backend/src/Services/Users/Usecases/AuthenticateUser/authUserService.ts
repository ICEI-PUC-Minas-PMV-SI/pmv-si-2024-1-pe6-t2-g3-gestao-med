import prismaClient from '../../../../prisma';
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { CustomError } from '../../../../errors/custom.error';

export interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute( { email, password }: AuthRequest){

        const jwtSecret = process.env.JWT_SECRET || ""

        //check if email exists
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new CustomError("Email/password incorrect", 400)
        }

        //check if password is correct
        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch){
            throw new CustomError("User/password incorrect", 400)
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            jwtSecret,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            date_of_birth: user.date_of_birth,
            gender: user.gender,
            token: token
        }
        
    }
}

export { AuthUserService }