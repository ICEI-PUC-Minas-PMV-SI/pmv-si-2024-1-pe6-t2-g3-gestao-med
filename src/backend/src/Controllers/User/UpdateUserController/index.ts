import { UserPrismaRepository } from "../../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { UpdateUserController } from "./updateUserController";

const usersRepository = new UserPrismaRepository()
const updateUserController = new UpdateUserController(usersRepository)

export { updateUserController }