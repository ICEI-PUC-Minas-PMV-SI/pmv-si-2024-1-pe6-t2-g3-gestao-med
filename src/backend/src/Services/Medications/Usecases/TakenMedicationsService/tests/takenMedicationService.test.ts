import { beforeAll, describe, expect, it } from "vitest"
import { UserMemoryRepository } from "../../../../Users/Repositories/implementations/in-memory/user-memory.repository"
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository"
import { UserRequestDTO } from "../../../../Users/UserDto/user.dto"
import { CreateUserService } from "../../../../Users/Usecases/CreateUser/createUserService"
import { Medication } from "../../../MedicationsDto/medications.dto"
import { RegisterMedicateService } from "../../RegisterMedicateService/registerMedicateService"
import { TakenMedicationService } from "../takenMedicationsService"
import { RegisterDTO } from "../../../../Registers/RegistersDto/registers.dto"

let medicationsMemoryRepository = new MedicationsMemoryRepository()
let userMemoryRepository = new UserMemoryRepository()

beforeAll(async () => {

    //Create user
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

    const user = await userMemoryRepository.findByEmail("joao@joao.com")
    
    //create medication
    const medicationMock: Medication = {
        user_id: user!.id,
        name: "MedicationTest",
        description: "MedicationDescription",
        stock: 22,
        time_to_take: "12:00",
        treatment_finished_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
    }


    const medicationService = new RegisterMedicateService(medicationsMemoryRepository)
     await medicationService.execute(medicationMock)

})

describe("Taken Medication Service", () => {
    it("Should be able to register time that medication was taken", async () => {
        const user = await userMemoryRepository.findByEmail("joao@joao.com")
        const findMedicationByUserId = await medicationsMemoryRepository.findByUserId(user!.id)
        const medication = findMedicationByUserId[0]

        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:user!.id,
            medication_id: medication!.id,
            medication_name: medication!.name,
            medication_taken: true,
            time_taken:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        }
        const registerTimeTaken = await takenMedicationService.execute(registerMock)
        
        expect(registerTimeTaken).toEqual("Registrado com sucesso")
    })

    it("Should not be able to register time that medication was taken if user id is missing", async () => {
        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:'',
            medication_id: 'medication!.id',
            medication_name: 'medication!.name',
            medication_taken: true,
            time_taken:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        }
        
        expect(async () => {
             await takenMedicationService.execute(registerMock)
        }).rejects.toThrow("User id is required")
    })
    it("Should not be able to register time that medication was taken if medication id is missing", async () => {
        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:'1',
            medication_id: '',
            medication_name: 'medication!.name',
            medication_taken: true,
            time_taken:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        }
        
        expect(async () => {
             await takenMedicationService.execute(registerMock)
        }).rejects.toThrow("Medication id is required")
    })

    it("Should not be able to register time that medication was taken if time taken is missing", async () => {
        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:'1',
            medication_id: '1',
            medication_name: 'medication!.name',
            medication_taken: true,
            time_taken:null,
            created_at:new Date(),
            updated_at:new Date()
        }
        
        expect(async () => {
             await takenMedicationService.execute(registerMock)
        }).rejects.toThrow("Time taken is required")
    })

    it("Should not be able to register time that medication was taken if user does not exist", async () => {
        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:'1',
            medication_id: '1',
            medication_name: 'name',
            medication_taken: true,
            time_taken:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        }
        
        expect(async () => {
             await takenMedicationService.execute(registerMock)
        }).rejects.toThrow("User not found")
    })
    it("Should not be able to register time that medication was taken if medication does not exist", async () => {
        const user = await userMemoryRepository.findByEmail("joao@joao.com")

        const takenMedicationService = new TakenMedicationService(medicationsMemoryRepository, userMemoryRepository)
        
        const registerMock:RegisterDTO = {
            user_id:user!.id,
            medication_id: '1',
            medication_name: 'name',
            medication_taken: true,
            time_taken:new Date(),
            created_at:new Date(),
            updated_at:new Date()
        }
        
        expect(async () => {
             await takenMedicationService.execute(registerMock)
        }).rejects.toThrow("Medication not found")
    })
})
