import { Request, Response } from 'express'

import { CreateUserService } from '../../Services/Users/Usecases/CreateUser/createUserService'
import { IUsersRepository } from '../../Services/Users/Repositories/users.repository'
import { UserAuthDTO } from '../../Services/Users/UserDto/user.dto'

class CreateUserController{

    constructor(
        private useRepository: IUsersRepository
    ){}

    async handle(req: Request, res: Response){

        try{

            const data: UserAuthDTO = req.body
    
            const createUserService = new CreateUserService(this.useRepository)
    
            const user = await createUserService.execute(data)
    
            return res.json(user)
        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

    }
}

export { CreateUserController }