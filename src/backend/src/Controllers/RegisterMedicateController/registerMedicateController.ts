import { Request, Response } from 'express'
import { RegisterMedicateService } from '../../Services/Medications/Usecases/RegisterMedicateService/registerMedicateService'
import { IMedicationsRepository } from '../../Services/Medications/Repositories/medications.repository'
import { MedicationsDTO } from '../../Services/Medications/MedicationsDto/medications.dto'

class RegisterMedicateController{
    constructor(private medicationRepository: IMedicationsRepository){}

    async handle(req: Request, res: Response){

        try{
            const registerMedicateService = new RegisterMedicateService(this.medicationRepository)
            const data: MedicationsDTO = req.body
            const regiterMedication = await registerMedicateService.execute(data)

            return res.status(201).json(regiterMedication)
        }
        catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export {RegisterMedicateController}