import { beforeAll, describe, expect, it } from "vitest";
import { UserMemoryRepository } from "../../../Repositories/implementations/in-memory/user-memory.repository";
import { AuthUserService } from "../authUserService";
import { PasswordBcrypt } from "../../../../../shared/crypto/password.bcrypt";
import { JWTToken } from "../../../../../shared/token/jwt.token";
import { UserRequestDTO } from "../../../UserDto/user.dto";
import { CreateUserService } from "../../CreateUser/createUserService";

let userMemoryRepository = new UserMemoryRepository()

beforeAll(async () => {
    const userMock: UserRequestDTO = {
        isAdmin: false,
        name: "João do Teste",
        email: "joao@joao.com",
        password: "senha123",
        phone: "08547895412",
        date_of_birth: new Date(),
        gender: "MALE",
        created_at: new Date(),
        updated_at: new Date()
    }

    const createUserInMemory = new CreateUserService(userMemoryRepository)
    await createUserInMemory.execute(userMock)
})

describe("Authenticate User Service", () => {
    it("Should be able to authenticate User", async () => {
        const passwordCrypto = new PasswordBcrypt()
        const tokenGenerated = new JWTToken()


        const userAuth = {
            email: "joao@joao.com",
            password: "senha123"
        }

        const authUserService = new AuthUserService(userMemoryRepository, passwordCrypto, tokenGenerated)

        const user = await authUserService.execute(userAuth)
        expect(user).toHaveProperty("token")

    })

    it("Should not be able to authenticate User if email is incorrect", async () => {
        const passwordCrypto = new PasswordBcrypt()
        const tokenGenerated = new JWTToken()


        const userAuth = {
            email: "joa@joao.com",
            password: "senha123"
        }

        const authUserService = new AuthUserService(userMemoryRepository, passwordCrypto, tokenGenerated)

        expect(async () => {
            await authUserService.execute(userAuth)            
        }).rejects.toThrow("Email/password incorrect")
    })

    it("Should not be able to authenticate User if password is incorrect", async () => {
        const passwordCrypto = new PasswordBcrypt()
        const tokenGenerated = new JWTToken()


        const userAuth = {
            email: "joao@joao.com",
            password: "sen23"
        }

        const authUserService = new AuthUserService(userMemoryRepository, passwordCrypto, tokenGenerated)

        expect(async () => {
            await authUserService.execute(userAuth)            
        }).rejects.toThrow("Email/password incorrect")
    })
})