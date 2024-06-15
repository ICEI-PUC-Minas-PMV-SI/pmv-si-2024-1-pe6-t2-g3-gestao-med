import { UserPrismaRepository } from "../../../Services/Users/Repositories/implementations/prisma/user-prisma.repository";
import { PasswordBcrypt } from "../../../shared/crypto/password.bcrypt";
import { JWTToken } from "../../../shared/token/jwt.token";
import { AuthUserController } from "./authUserController";

const userPrismaRepository = new UserPrismaRepository()
const passwordCrypto = new PasswordBcrypt()
const tokenGenerated = new JWTToken()

const authUserController = new AuthUserController(
    userPrismaRepository,
    passwordCrypto,
    tokenGenerated
)

export { authUserController }