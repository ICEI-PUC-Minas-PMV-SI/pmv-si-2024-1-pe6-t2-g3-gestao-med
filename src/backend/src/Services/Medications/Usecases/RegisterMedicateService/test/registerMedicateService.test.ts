import { beforeAll, describe, expect, it } from "vitest";
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository";
import { UserRequestDTO } from "../../../../Users/UserDto/user.dto";
import { Medication, MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { RegisterMedicateService } from "../registerMedicateService";


describe("Create Medication Service", () => {
    it("Should be able to create a new Medication", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 22,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        const medication = await medicationService.execute(medicationMock)
        console.log({medication})
        expect(medication).toHaveProperty("id")

    })

    it("Should not be able to create a new Medication if user id Missing", async()=>{
        const user_id = ""
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 22,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("User id is required")
    })

    it("Should not be able to create a new Medication if name Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "",
            description : "MedicationDescription",
            stock: 22,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Name is required")
    })

    it("Should not be able to create a new Medication if description Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "",
            stock: 22,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Descripton is required")
    })

    it("Should not be able to create a new Medication if description Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 0,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Stock is required")
    })

    it("Should not be able to create a new Medication if stock Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 1,
            time_to_take: "",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Time to take is required")
    })

    it("Should not be able to create a new Medication if treatment finished at Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 1,
            time_to_take: "12:00",
            treatment_finished_at : null,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Treatment finished at is required")
    })

    it("Should not be able to create a new Medication if created at Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 1,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: null,
            updated_at: new Date(),
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Created at is required")
    })

    it("Should not be able to create a new Medication if updated at Missing", async()=>{
        const user_id = "1"
        
        const medicationMock: Medication = {
            user_id : user_id,
            name : "MedicationTest",
            description : "MedicationDescription",
            stock: 1,
            time_to_take: "12:00",
            treatment_finished_at : new Date(),
            created_at: new Date(),
            updated_at: null,
            deleted_at: null,
        }

        const medicationsMemoryRepository = new MedicationsMemoryRepository()

        const medicationService = new RegisterMedicateService(medicationsMemoryRepository)

        expect(async () => {
            await medicationService.execute(medicationMock)
        }).rejects.toThrow("Updated at is required")
    })
})