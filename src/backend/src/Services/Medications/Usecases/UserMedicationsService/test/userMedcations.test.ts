import { beforeAll, describe, expect, it } from "vitest";
import { UserRequestDTO } from "../../../../Users/UserDto/user.dto";
import { CreateUserService } from "../../../../Users/Usecases/CreateUser/createUserService";
import { UserMemoryRepository } from "../../../../Users/Repositories/implementations/in-memory/user-memory.repository";
import { PasswordBcrypt } from "../../../../../shared/crypto/password.bcrypt";
import { JWTToken } from "../../../../../shared/token/jwt.token";
import { AuthUserService } from "../../../../Users/Usecases/AuthenticateUser/authUserService";
import { UserMedicationsService } from "../userMedicationsService";
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository";

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
describe("User medications service", () => {

    it("Should not be able to find user medications if Id is missing", async () => {
        
        const id = ""

        const medicationsRepository = new MedicationsMemoryRepository()
        const userMedicationsService = new UserMedicationsService(medicationsRepository)

        expect(async () => {
            await userMedicationsService.execute(id)
        }).rejects.toThrow("UserId is required!")
    })

    it("Should not be able to find user medications", async () => {
        
        const id = "USER_ID"

        const medicationsRepository = new MedicationsMemoryRepository()
        const userMedicationsService = new UserMedicationsService(medicationsRepository)

        expect(async () => {
            await userMedicationsService.execute(id)
        }).rejects.toThrow("Medications not found!")
    })


})