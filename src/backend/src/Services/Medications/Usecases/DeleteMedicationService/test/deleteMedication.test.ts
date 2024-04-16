import { beforeAll, describe, expect, it } from "vitest";
import { MedicationsMemoryRepository } from "../../../Repositories/implementations/in-memory/medications-memory.repository";
import { DeleteMedicationService } from "../deleteMedicationService";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";

let medicationsMemoryRepository = new MedicationsMemoryRepository()

beforeAll(async () => {
    
    const medication: MedicationsDTO = {
        id: "id",
        name: "nome",
        description: "descrição",
        stock: 15,
        time_to_take: "21:00",
        treatment_finished_at: null,
        user_id: "user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
    }
    
    const medicationDeleted: MedicationsDTO = {
        id: "id_deleted",
        name: "nome",
        description: "descrição",
        stock: 15,
        time_to_take: "21:00",
        treatment_finished_at: null,
        user_id: "user",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date()
    }
    
    await medicationsMemoryRepository.save(medication)
    await medicationsMemoryRepository.save(medicationDeleted)
})

describe("Delete medication service", () => {

    it("Medication id is missing - fail", async () => {
        
        const medicationId = ""
        const userId = "teste"

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        expect(async () => {
            await deleteMedicationService.execute(medicationId, userId)
        }).rejects.toThrow("Medication id is required")
    })

    it("User id is missing - fail", async () => {
        
        const medicationId = "teste"
        const userId = ""

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        expect(async () => {
            await deleteMedicationService.execute(medicationId, userId)
        }).rejects.toThrow("User id is required")
    })

    it("Medication not found - fail", async () => {
        
        const medicationId = "teste"
        const userId = "teste"

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        expect(async () => {
            await deleteMedicationService.execute(medicationId, userId)
        }).rejects.toThrow("Medication not found")
    })

    it("Medication is already deleted - fail", async () => {
        
        const medicationId = "id_deleted"
        const userId = "teste"

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        expect(async () => {
            await deleteMedicationService.execute(medicationId, userId)
        }).rejects.toThrow("Medication is already deleted")
    })

    it("Medication is not from the user - fail", async () => {
        
        const medicationId = "id"
        const userId = "teste"

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        expect(async () => {
            await deleteMedicationService.execute(medicationId, userId)
        }).rejects.toThrow("Invalid operation")
    })

    it("Delete medication - success", async () => {
        
        const medicationId = "id"
        const userId = "user"

        const medicationsRepository = new MedicationsMemoryRepository()
        const deleteMedicationService = new DeleteMedicationService(medicationsRepository)

        await deleteMedicationService.execute(medicationId, userId)

        expect(async () => {
            const medication = await medicationsMemoryRepository.findById(medicationId)
            medication?.deleted_at
        }).equals(new Date())
    })
})