import { RegistersPrismaRepository } from "../../../Services/Registers/Repositories/implementations/prisma/registers-prisma.repository";
import { ExportRegistersReportController } from "./exportRegistersReportController";

const registersRepository = new RegistersPrismaRepository()
const exportRegistersReportController = new ExportRegistersReportController(registersRepository)

export { exportRegistersReportController }