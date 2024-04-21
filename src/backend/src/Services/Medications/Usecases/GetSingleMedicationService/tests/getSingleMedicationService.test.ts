import { beforeAll, describe, expect, it } from "vitest"
import { UserRequestDTO } from "../../../../Users/UserDto/user.dto"
import { CreateUserService } from "../../../../Users/Usecases/CreateUser/createUserService"
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository"
import { UserMemoryRepository } from "../../../../Users/Repositories/implementations/in-memory/user-memory.repository"
import { Medication } from "../../../MedicationsDto/medications.dto"
import { RegisterMedicateService } from "../../RegisterMedicateService/registerMedicateService"
import { GetSingleMedicationService } from "../getSingleMedicationService"
import { getSingleMedicationController } from "../../../../../Controllers/GetSingleMedicationController"

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

describe("Get single medication service", () => {
    it("Should be able to get medication by Id", async () => {

        const user = await userMemoryRepository.findByEmail("joao@joao.com")

        const findMedicationByUserId = await medicationsMemoryRepository.findByUserId(user!.id)

        const medication = findMedicationByUserId[0]

        const getMedicationService = new GetSingleMedicationService(medicationsMemoryRepository, userMemoryRepository)

        const getMedication = await getMedicationService.execute(user!.id, medication.id)

        expect(getMedication).toHaveProperty("id")
    })

    it("Should not be able to get medication if user id is missing", async () => {

        const user_id = ''
        const medication_id = '1'

        const getMedicationService = new GetSingleMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
           await getMedicationService.execute(user_id,medication_id)
        }).rejects.toThrow("User id is required")
    })

    it("Should not be able to get medication if medication id is missing", async () => {

        const user_id = '1'
        const medication_id = ''
        const getMedicationService = new GetSingleMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
           await getMedicationService.execute(user_id,medication_id)
        }).rejects.toThrow("Medication id is required")
    })

    it("Should not be able to get medication if user does not exist", async () => {

        const user_id = '1'
        const medication_id = '2'
        const getMedicationService = new GetSingleMedicationService(medicationsMemoryRepository, userMemoryRepository)

        expect(async () => {
           await getMedicationService.execute(user_id,medication_id)
        }).rejects.toThrow("User not found")
    })

    it("Should not be able to get medication if medication does not exist", async () => {
        const user = await userMemoryRepository.findByEmail("joao@joao.com")

        const findMedicationByUserId = await medicationsMemoryRepository.findByUserId(user!.id)

        const medication_id = '2'
        const getMedicationService = new GetSingleMedicationService(medicationsMemoryRepository, userMemoryRepository)

        expect(async () => {
           await getMedicationService.execute(user!.id,medication_id)
        }).rejects.toThrow("Medication not found")
    })
})