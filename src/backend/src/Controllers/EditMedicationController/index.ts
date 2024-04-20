import { MedicationsPrismaRepository } from "../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { UserPrismaRepository } from "../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { EditMedicationController } from "./EditMedicationController";


const userRepository = new UserPrismaRepository()

const medicationRepository = new MedicationsPrismaRepository()

const editMedicationController = new EditMedicationController(medicationRepository, userRepository,  )

export {editMedicationController}