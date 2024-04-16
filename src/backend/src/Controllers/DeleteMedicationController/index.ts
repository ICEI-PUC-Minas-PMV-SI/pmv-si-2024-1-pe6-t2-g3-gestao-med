import { MedicationsPrismaRepository } from "../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { DeleteMedicationController } from "./deleteMedicationController";

const medicationPrismaRepository = new MedicationsPrismaRepository()
const deleteMedicationController = new DeleteMedicationController(medicationPrismaRepository)

export {deleteMedicationController}