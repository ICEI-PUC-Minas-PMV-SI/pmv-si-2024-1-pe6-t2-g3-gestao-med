import { beforeAll, describe, expect, it } from "vitest";
import { UserMemoryRepository } from "../../../Repositories/implementations/in-memory/user-memory.repository";
import { UserRequestDTO } from "../../../UserDto/user.dto";
import { CreateUserService } from "../../CreateUser/createUserService";
import { PasswordBcrypt } from "../../../../../shared/crypto/password.bcrypt";
import { JWTToken } from "../../../../../shared/token/jwt.token";
import { AuthUserService } from "../../AuthenticateUser/authUserService";
import { UserDetailsService } from "../userDetailsService";


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

describe("User Details Service", () => {
    it("Should be able to find user", async () => {

        //Authenticate user
        const passwordCrypto = new PasswordBcrypt()
        const tokenGenerated = new JWTToken()

        const userAuth = {
            email: "joao@joao.com",
            password: "senha123"
        }
    
        const authUserService = new AuthUserService(userMemoryRepository, passwordCrypto, tokenGenerated)
        const user = await authUserService.execute(userAuth)


        const userDetailsService = new UserDetailsService(userMemoryRepository)

        const userDetails = await userDetailsService.execute(user.id)

        expect(userDetails).toHaveProperty("id")
    })

    it("Should not be able to find user if user id is missing", async () => {
        const id = ""

        const userDetailsService = new UserDetailsService(userMemoryRepository)

        expect(async () => {
            await userDetailsService.execute(id)
        }).rejects.toThrow("UserId is required!")
    })

    
    it("Should not be able to find user if user does not exist", async () => {
        const id = "654981651a98v1a"

        const userDetailsService = new UserDetailsService(userMemoryRepository)

        expect(async () => {
            await userDetailsService.execute(id)
        }).rejects.toThrow("User not found!")
    })
})