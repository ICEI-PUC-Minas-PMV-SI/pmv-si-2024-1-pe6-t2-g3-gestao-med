import { Request, Response } from 'express'
import { IMedicationsRepository } from '../../Services/Medications/Repositories/medications.repository'
import { TakenMedicationService } from '../../Services/Medications/Usecases/TakenMedicationsService/takenMedicationsService'
import { IUsersRepository } from '../../Services/Users/Repositories/users.repository'
import { RegisterDTO } from '../../Services/Registers/RegistersDto/registers.dto'


class TakenMedicationController{
    constructor(
    private medicationRepository: IMedicationsRepository,
    private usersRepository: IUsersRepository){}

   async handle(req: Request, res: Response){

        try{
            

            const data: RegisterDTO = req.body
            data.user_id = req.user_id

            const takenMedicationService = new TakenMedicationService(this.medicationRepository, this.usersRepository)
            const result = await takenMedicationService.execute(data)
            
            return res.status(201).json(result)

        } catch(err: any){
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export {TakenMedicationController}