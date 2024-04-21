import { Request, Response } from 'express'
import { IMedicationsRepository } from '../../Services/Medications/Repositories/medications.repository'
import { DeleteMedicationService } from '../../Services/Medications/Usecases/DeleteMedicationService/deleteMedicationService'

class DeleteMedicationController{
    constructor(private medicationRepository: IMedicationsRepository){}

    async handle(req: Request, res: Response){

        try{
            const deleteMedicationService = new DeleteMedicationService(this.medicationRepository)
            
            const userId = req.user_id
            const medicationId: string = req.params.medicationId
            const medication = await deleteMedicationService.execute(medicationId, userId)

            return res.json(medication)
        }
        catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export {DeleteMedicationController}