import { Router } from "express";
import { isAuthenticated } from "../../shared/middlewares/user-auth.middleware";
import { exportRegistersReportController } from "../../Controllers/Registers/ExportRegistersReportController";

const registersRouter = Router()

//registers report
registersRouter.get("/registers/report", isAuthenticated, async (request, response) => {
    await exportRegistersReportController.handle(request, response)
})
 
export {registersRouter}