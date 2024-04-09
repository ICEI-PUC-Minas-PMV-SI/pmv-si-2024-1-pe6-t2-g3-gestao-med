import { MedicationsPrismaRepository } from "../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { UserMedicationsController } from "./userMedicationsController";

const medicationsRepository = new MedicationsPrismaRepository()
const userMedicationsController = new UserMedicationsController(medicationsRepository)

export { userMedicationsController }