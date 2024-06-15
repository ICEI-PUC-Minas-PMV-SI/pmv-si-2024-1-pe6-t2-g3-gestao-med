import { Request, Response } from "express";
import { IUsersRepository } from "../../../Services/Users/Repositories/users.repository";
import { UpdateUserUsecase } from "../../../Services/Users/Usecases/UpdateUser/updateUserService";

class UpdateUserController{
    constructor(
        private userRepository: IUsersRepository
    ){}

    async handle(req: Request, res: Response){
        try{
            const user_id = req.user_id

            const { email, name, date_of_birth, gender} = req.body

            const updateUserUsecase = new UpdateUserUsecase(this.userRepository)

            await updateUserUsecase.execute(email, name, date_of_birth, gender, user_id)

            return res.status(204).json()
        }catch(err: any){
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { UpdateUserController }