import { Request, Response } from 'express'
import { IMedicationsRepository } from '../../../Services/Medications/Repositories/medications.repository'
import { RegisterMedicateService } from '../../../Services/Medications/Usecases/RegisterMedicateService/registerMedicateService'
import { Medication, MedicationsDTO } from '../../../Services/Medications/MedicationsDto/medications.dto'
import { EditMedicationService } from '../../../Services/Medications/Usecases/EditMedicationService/editMedicationService';

class RegisterMedicateController {

    constructor(private medicationRepository: IMedicationsRepository){}

    async handle(req: Request, res: Response) {
        try {
            const data: MedicationsDTO = req.body;
            data.user_id = req.user_id;
            const registerMedicateService = new RegisterMedicateService(this.medicationRepository);
            const regiterMedication = await registerMedicateService.execute(data);
            return res.status(201).json(regiterMedication);

        } catch(err: any){
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export {RegisterMedicateController}