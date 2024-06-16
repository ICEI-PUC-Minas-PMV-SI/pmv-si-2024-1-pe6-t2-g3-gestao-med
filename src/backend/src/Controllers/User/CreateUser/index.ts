import { UserPrismaRepository } from "../../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { CreateUserController } from "./createUserController";

const userRepository = new UserPrismaRepository()
const createUserController = new CreateUserController(userRepository)

export { createUserController }