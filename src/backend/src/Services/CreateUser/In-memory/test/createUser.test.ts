import { describe, expect, it} from 'vitest'
import { CreateUserInMemory } from '../createUserInMemory'

describe("Create User Service", () => {
    it("Should be able to create a new User", async () => {
        const name = "João do Teste"
        const password = "senha123"
        const email = "joao@joao.com"

        const createUserInMemory = new CreateUserInMemory()

        const newUser = await createUserInMemory.execute({
            name,
            password,
            email
        })


        
        expect(newUser).toContainEqual({name, password, email})
    })

    it("Should not be able to create a new User if email already exists", async () => {
        const name = "João do Teste"
        const password = "senha123"
        const email = "joao@joao.com"

        const name2 = "João do Teste"
        const password2 = "senha123"
        const email2 = "joao@joao.com"

        const createUserInMemory = new CreateUserInMemory()

        await createUserInMemory.execute({
            name,
            password,
            email
        })

        expect(async () => {
            await createUserInMemory.execute({
                name: name2,
                password: password2,
                email: email2
            })
        }).rejects.toThrow("User already exists")
    })

    it("Shoud not be able to create a new User if email is missing", async () => {
        const name = "João do Teste"
        const password = "senha123"
        const email = ""

        const createUserInMemory = new CreateUserInMemory()

        expect(async () => {
            await createUserInMemory.execute({
                name,
                password,
                email
            })
        }).rejects.toThrow("Missing information")

    })

    it("Shoud not be able to create a new User if name is missing", async () => {
        const name = ""
        const password = "senha123"
        const email = "joao@joao.com"

        const createUserInMemory = new CreateUserInMemory()

        expect(async () => {
            await createUserInMemory.execute({
                name,
                password,
                email
            })
        }).rejects.toThrow("Missing information")

    })

    it("Shoud not be able to create a new User if password is missing", async () => {
        const name = "João do Teste"
        const password = ""
        const email = "joao@joao.com"

        const createUserInMemory = new CreateUserInMemory()

        expect(async () => {
            await createUserInMemory.execute({
                name,
                password,
                email
            })
        }).rejects.toThrow("Missing information")

    })

   
})