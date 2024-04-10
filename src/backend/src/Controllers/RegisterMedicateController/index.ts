import { MedicationsPrismaRepository } from "../../Services/Medications/Repositories/implementations/prisma/medications-prisma.repository";
import { UserPrismaRepository } from "../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { RegisterMedicateController } from "./registerMedicateController";

const medicationPrismaRepository = new MedicationsPrismaRepository()
const registerMedicateController = new RegisterMedicateController(medicationPrismaRepository)

export {registerMedicateController}