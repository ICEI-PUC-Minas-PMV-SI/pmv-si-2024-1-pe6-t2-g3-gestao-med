import { Request, Response } from "express";
import { UserMedicationsService } from "../../../Services/Medications/Usecases/UserMedicationsService/userMedicationsService";
import { IMedicationsRepository } from "../../../Services/Medications/Repositories/medications.repository";

class UserMedicationsController{
    constructor(
        private medicationRepository: IMedicationsRepository
      ){}

    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id;

            const userMedicationsService = new UserMedicationsService(this.medicationRepository);
            const medications = await userMedicationsService.execute(userId);

            return res.json(medications);
        } catch (err: any) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { UserMedicationsController }