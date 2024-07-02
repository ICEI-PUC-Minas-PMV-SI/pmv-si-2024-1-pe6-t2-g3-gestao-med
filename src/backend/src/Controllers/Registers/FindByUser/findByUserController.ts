import { Request, Response } from "express";
import { IMedicationsRepository } from "../../../Services/Medications/Repositories/medications.repository";
import { IUsersRepository } from "../../../Services/Users/Repositories/users.repository";
import { FindByUserService } from "../../../Services/Registers/Usecases/FindByUser/findByUserService";
import { IRegistersRepository } from "../../../Services/Registers/Repositories/registers.repository";

class FindByUserController{
    constructor(
        private registerRepository: IRegistersRepository,
        private usersRepository: IUsersRepository){}

    async handle(req: Request, res: Response){
        try{
            const userId = req.user_id
            const {start_date, end_date} = req.body

            const findbyUserService = new FindByUserService(this.registerRepository, this.usersRepository)

            const result = await findbyUserService.execute(userId, start_date, end_date)

            return res.json(result)
        }catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { FindByUserController }