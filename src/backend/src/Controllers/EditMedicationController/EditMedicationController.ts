import { Request, Response } from "express";
import { IMedicationsRepository } from "../../Services/Medications/Repositories/medications.repository";
import { IUsersRepository } from "../../Services/Users/Repositories/users.repository";

import { MedicationsDTO } from "../../Services/Medications/MedicationsDto/medications.dto";
import { EditMedicationService } from "../../Services/Medications/Usecases/EditMedicationService/editMedicationService";



class EditMedicationController {

    constructor(
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
    ) { }

    async handle(req: Request, res: Response) {

        try {

            const data: MedicationsDTO = req.body

            data.user_id = req.user_id

            const editMedicationService = new EditMedicationService (this.medicationsRepository, this.usersRepository)

            const medication = await editMedicationService.execute(data)

           return res.json(medication)
        }
        catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { EditMedicationController }