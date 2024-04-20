import { MedicationsPrismaRepository } from "../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { UserPrismaRepository } from "../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { TakenMedicationController } from "./takenMedicationController";

const medicationPrismaRepository = new MedicationsPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const takenMedicationController = new TakenMedicationController(medicationPrismaRepository, userPrismaRepository
    
)

export {takenMedicationController}