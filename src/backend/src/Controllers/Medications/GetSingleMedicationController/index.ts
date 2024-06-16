import { MedicationsPrismaRepository } from "../../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { UserPrismaRepository } from "../../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { GetSingleMedicationController } from "./getSingleMedicationController";

const userRepository = new UserPrismaRepository()

const medicationRepository = new MedicationsPrismaRepository()

const getSingleMedicationController = new GetSingleMedicationController(medicationRepository, userRepository)

export {getSingleMedicationController}