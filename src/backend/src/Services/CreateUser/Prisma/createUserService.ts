import { CustomError } from '../../../errors/custom.error';
import prismaClient from '../../../prisma'

import { hash } from "bcryptjs"

interface UserRequest{
    name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
    password: string;
}

class CreateUserService{
    async execute( { name, email, phone, date_of_birth, gender, password}: UserRequest){
        
        // Check if the user inserted all the data
        if (!email || !password || !name || !phone || !date_of_birth || !gender){
            throw new CustomError("Missing information", 400)
        }

        // Check if the user entered a valid gender
        if (gender.toUpperCase() !== "MALE" && gender.toUpperCase() !== "FEMALE") {
            throw new CustomError("Invalid gender!", 400)
        }

        const phoneRegex = /^\d{11}$/;

        // Check if the user entered a valid phone number
        if (!phoneRegex.test(phone)) {
            throw new CustomError("Invalid phone number!", 400)
        }

        const today = new Date();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        // Check if the user entered a valid date of birth
        if ((new Date(date_of_birth)).getTime() > today.getTime()) {
            throw new CustomError("Date of birth must be before today!", 400)
        }
        if (!dateRegex.test(date_of_birth)) {
            throw new CustomError("Invalid date format!", 400)
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
                phone: phone,
                date_of_birth: new Date(date_of_birth),
                gender: gender.toUpperCase() as "MALE" | "FEMALE",
                password: passwordHash
            },
            select:{
                id: true,
                name: true,
                email: true,
                phone: true,
                date_of_birth: true,
                gender: true
            }
        })

        return user
    }
}

export { CreateUserService }