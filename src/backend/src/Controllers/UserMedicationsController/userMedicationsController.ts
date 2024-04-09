import { Request, Response } from "express";
import { UserMedicationsService } from "../../Services/Medications/UserMedicationsService/userMedicationsService";

class UserMedicationsController{
    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id;

            const userMedicationsService = new UserMedicationsService();
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