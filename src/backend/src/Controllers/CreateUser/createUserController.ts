import { Request, Response } from 'express'

import { CreateUserService } from '../../Services/CreateUser/Prisma/createUserService'

class CreateUserController{
    async handle(req: Request, res: Response){

        try{

            const { name, email, password } = req.body
    
            const createUserService = new CreateUserService()
    
            const user = await createUserService.execute({
                name,
                email,
                password
            })
    
            return res.json(user)
        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

    }
}

export { CreateUserController }