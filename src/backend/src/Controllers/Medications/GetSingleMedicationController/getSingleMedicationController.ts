import { Request, Response } from "express";
import { IMedicationsRepository } from "../../../Services/Medications/Repositories/medications.repository";
import { IUsersRepository } from "../../../Services/Users/Repositories/users.repository";
import { GetSingleMedicationService } from "../../../Services/Medications/Usecases/GetSingleMedicationService/getSingleMedicationService";


class GetSingleMedicationController{

    constructor(
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
    ) { }

    async handle (req: Request, res: Response){

        try{

            const medicationId = req.query.medicationId as string

            const userId = req.user_id

            const singleMedicationService = new GetSingleMedicationService(this.medicationsRepository, this.usersRepository)

            const medication = await singleMedicationService.execute(userId, medicationId)

            return res.json(medication)




        } catch(err: any){
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export{GetSingleMedicationController}
