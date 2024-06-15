import { Request, Response } from "express";
import { IRegistersRepository } from "../../../Services/Registers/Repositories/registers.repository";
import { ExportRegistersReportService } from "../../../Services/Registers/Usecases/ExportRegistersReportService/exportRegistersReportService";

class ExportRegistersReportController{
    constructor(
        private registersRepository: IRegistersRepository
    ){}

    async handle(req: Request, res: Response) {
        try {
            const userId = req.user_id;

            const startDate = req.query.startDate as string

            const endDate = req.query.endDate as string
            const exportRegistersReportService = new ExportRegistersReportService(this.registersRepository);
            const registersBase64 = await exportRegistersReportService.execute(userId, startDate, endDate);

            return res.json({base64: registersBase64});
        } catch (err: any) {
            console.log({err})
            return res.status(err.statusCode).json({
                error: err.message
            })
        }
    }
}

export { ExportRegistersReportController }