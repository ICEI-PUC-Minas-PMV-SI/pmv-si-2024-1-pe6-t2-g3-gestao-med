import { beforeAll, describe, expect, it } from "vitest";
import { Medication, MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository";
import { RegisterMedicateService } from "../../RegisterMedicateService/registerMedicateService";
import { UserMemoryRepository } from "../../../../Users/Repositories/implementations/in-memory/user-memory.repository";
import { UserRequestDTO } from "../../../../Users/UserDto/user.dto";
import { CreateUserService } from "../../../../Users/Usecases/CreateUser/createUserService";
import { EditMedicationService } from "../editMedicationService";

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
describe("Edit Medication Service", () => {
    it("Should be able to edit medication", async () => {

        const user = await userMemoryRepository.findByEmail("joao@joao.com")

        const findMedicationByUserId = await medicationsMemoryRepository.findByUserId(user!.id)

        const medication = findMedicationByUserId[0]

        const editMedicationMock: MedicationsDTO = {
            id: medication.id,
            user_id: medication.user_id,
            name: 'New name',
            description: medication.description,
            stock: medication.stock,
            time_to_take: medication.time_to_take,
            treatment_finished_at: medication.treatment_finished_at,
            created_at: null,
            updated_at: null,
            deleted_at: null
        }

        const editMedicationService = new EditMedicationService(medicationsMemoryRepository, userMemoryRepository)

        const editMedication = await editMedicationService.execute(editMedicationMock)

        expect(editMedication.name).toEqual("New name")
        expect(editMedication.description).toEqual("MedicationDescription")

    })

    it("Should not be able to edit medication if user id is missing", async () => {

        const editMedicationMock: MedicationsDTO = {
            id: 'medicationCreated.id',
            user_id: '',
            name: 'New name',
            description: 'medicationCreated.description',
            stock: 2,
            time_to_take: '14:00',
            treatment_finished_at: new Date(),
            created_at: null,
            updated_at: null,
            deleted_at: null
        }

        const editMedicationService = new EditMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
            await editMedicationService.execute(editMedicationMock)
        }).rejects.toThrow("User id is required")

    })

    it("Should not be able to edit medication if medication id is missing", async () => {


        const editMedicationMock: MedicationsDTO = {
            id: '',
            user_id: '1',
            name: 'New name',
            description: 'medicationCreated.description',
            stock: 2,
            time_to_take: '14:00',
            treatment_finished_at: new Date(),
            created_at: null,
            updated_at: null,
            deleted_at: null
        }

        const editMedicationService = new EditMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
            await editMedicationService.execute(editMedicationMock)
        }).rejects.toThrow("Medication id is required")

    })

    it("Should not be able to edit medication if user does not exist", async () => {


        const editMedicationMock: MedicationsDTO = {
            id: '1',
            user_id: '1',
            name: 'New name',
            description: 'medicationCreated.description',
            stock: 2,
            time_to_take: '14:00',
            treatment_finished_at: new Date(),
            created_at: null,
            updated_at: null,
            deleted_at: null
        }

        const editMedicationService = new EditMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
            await editMedicationService.execute(editMedicationMock)
        }).rejects.toThrow("User not found")

    })

    it("Should not be able to edit medication if medication does not exist", async () => {

        const user = await userMemoryRepository.findByEmail("joao@joao.com")

        const editMedicationMock: MedicationsDTO = {
            id: '1',
            user_id: user!.id,
            name: 'New name',
            description: 'medicationCreated.description',
            stock: 2,
            time_to_take: '14:00',
            treatment_finished_at: new Date(),
            created_at: null,
            updated_at: null,
            deleted_at: null
        }

        const editMedicationService = new EditMedicationService(medicationsMemoryRepository, userMemoryRepository)


        expect(async () => {
            await editMedicationService.execute(editMedicationMock)
        }).rejects.toThrow("Medication not found")

    })


})