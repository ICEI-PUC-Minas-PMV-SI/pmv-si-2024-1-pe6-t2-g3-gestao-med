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

        console.log({newUser})

        
        expect(newUser).toHaveProperty("id")
    })
})