import { Request, Response } from 'express'
import { IMedicationsRepository } from '../../Services/Medications/Repositories/medications.repository'
import { TakenMedicationService } from '../../Services/Medications/Usecases/TakenMedicationsService/takenMedicationsService'
import { IUsersRepository } from '../../Services/Users/Repositories/users.repository'


class TakenMedicationController{
    constructor(
    private medicationRepository: IMedicationsRepository,
    private usersRepository: IUsersRepository){}

   async handle(req: Request, res: Response){

        try{
            const medicationId = req.body.medication_id 
            const userId = req.user_id 
            const timeTaken = req.body.time_taken  
            
            const takenMedicationService = new TakenMedicationService(this.medicationRepository, this.usersRepository)
            await takenMedicationService.execute(userId,medicationId, timeTaken)
            
            return res.status (200).json({msg:"registrado com sucesso"})

        } catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export {TakenMedicationController}