import { UserPrismaRepository } from "../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { UserDetailsController } from "./userDetailsController";


const userPrismaRepository = new UserPrismaRepository()
const userDetailsController = new UserDetailsController(userPrismaRepository)

export { userDetailsController }