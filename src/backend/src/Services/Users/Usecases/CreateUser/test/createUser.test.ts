import { describe, expect, it } from 'vitest'
import { CreateUserService } from '../createUserService'
import { UserMemoryRepository } from '../../../Repositories/implementations/in-memory/user-memory.repository'
import { UserAuthDTO, UserRequestDTO } from '../../../UserDto/user.dto'

describe("Create User Service", () => {
    it("Should be able to create a new User", async () => {
        const userRepository = new UserMemoryRepository()

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
        const createUserInMemory = new CreateUserService(userRepository)

        await createUserInMemory.execute(userMock)

        const checkUser = await userRepository.findByEmail(userMock.email)

        expect(checkUser).toHaveProperty("id")
    })

    it("Should not be able to create a new User if email already exists", async () => {
        const userRepository = new UserMemoryRepository()

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

        const userMock2: UserRequestDTO = {
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


        const createUserInMemory = new CreateUserService(userRepository)

        await createUserInMemory.execute(userMock)

        expect(async () => {
            await createUserInMemory.execute(userMock2)
        }).rejects.toThrow("User already exists")
    })

    it("Shoud not be able to create a new User if email is missing", async () => {
        const userRepository = new UserMemoryRepository()

        const userMock: UserRequestDTO = {
            isAdmin: false,
            name: "João do Teste",
            email: "",
            password: "senha123",
            phone: "08547895412",
            date_of_birth: new Date(),
            gender: "MALE",
            created_at: new Date(),
            updated_at: new Date()
        }

        const createUserInMemory = new CreateUserService(userRepository)

        expect(async () => {
            await createUserInMemory.execute(userMock)
        }).rejects.toThrow("Email is required")

    })

    it("Shoud not be able to create a new User if name is missing", async () => {
        const userRepository = new UserMemoryRepository()

        const userMock: UserRequestDTO = {
            isAdmin: false,
            name: "",
            email: "joao@joao.com",
            password: "senha123",
            phone: "08547895412",
            date_of_birth: new Date(),
            gender: "MALE",
            created_at: new Date(),
            updated_at: new Date()
        }

        const createUserInMemory = new CreateUserService(userRepository)

        expect(async () => {
            await createUserInMemory.execute(userMock)
        }).rejects.toThrow("Name is required")

    })

    it("Shoud not be able to create a new User if password is missing", async () => {
        const userRepository = new UserMemoryRepository()

        const userMock:UserRequestDTO = {
            isAdmin:false,
            name: "João do Teste",
            email: "joao@joao.com",
            password:"",
            phone:"08547895412",
            date_of_birth:new Date(),
            gender:"MALE",
            created_at: new Date(),
            updated_at: new Date()
        }

        const createUserInMemory = new CreateUserService(userRepository)

        expect(async () => {
            await createUserInMemory.execute(userMock)
        }).rejects.toThrow("Password is required")

    })

    it("Shoud not be able to create a new User if phone is invalid", async () => {
        const userRepository = new UserMemoryRepository()

        const userMock:UserRequestDTO = {
            isAdmin:false,
            name: "João do Teste",
            email: "joao@joao.com",
            password:"senha123",
            phone:"8547895412",
            date_of_birth:new Date(),
            gender:"MALE",
            created_at: new Date(),
            updated_at: new Date()
        }

        const createUserInMemory = new CreateUserService(userRepository)

        expect(async () => {
            await createUserInMemory.execute(userMock)
        }).rejects.toThrow("Invalid phone number!")

    })


})