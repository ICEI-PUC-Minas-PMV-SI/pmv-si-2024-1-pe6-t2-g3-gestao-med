import { beforeAll, describe, expect, it } from "vitest"
import { RegistersDTO } from "../../../../Registers/RegistersDto/registers.dto"
import { RegistersMemoryRepository } from "../../../Repositories/implementations/in-memory/registers-memory.repository"
import { ExportRegistersReportService } from "../exportRegistersReportService"

let registersMemoryRepository = new RegistersMemoryRepository()

beforeAll(async () => {
    const register: RegistersDTO = {
        id: "id_1",
        user_id: "user_id_1",
        medication_id: "medication_id_1",
        medication_name: "medication_teste_um",
        medication_taken: true,
        created_at: new Date("2024-04-10T00:00:00.000Z"),
        time_taken: new Date("2024-04-10T00:00:00.000Z"),
        updated_at: null
    }

    const registerTwo: RegistersDTO = {
        id: "id_2",
        user_id: "user_id_1",
        medication_id: "medication_id_1",
        medication_name: "medication_teste_dois",
        medication_taken: false,
        created_at: new Date("2024-04-15T00:00:00.000Z"),
        time_taken: new Date("2024-04-15T00:00:00.000Z"),
        updated_at: null
    }

    registersMemoryRepository.save(register)
    registersMemoryRepository.save(registerTwo)
})

describe("Taken Medication Service", () => {
    it("Should not be able to export registers report if user id is missing", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = ""
        const startDate = "2024-04-01"
        const endDate = "2024-04-31"
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("User id is required!")
    })

    it("Should not be able to export registers report if start date is missing", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = ""
        const endDate = "2024-04-31"
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("Start date is required!")
    })

    it("Should not be able to export registers report if end date is missing", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = "2024-04-01"
        const endDate = ""
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("End date is required!")
    })

    it("Should not be able to export registers report if start date is invalid format", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = "01-04-2024"
        const endDate = "2024-04-31"
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("Invalid start date format!")
    })

    it("Should not be able to export registers report if end date is invalid format", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = "2024-04-01"
        const endDate = "31-04-2024"
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("Invalid end date format!")
    })

    it("Should not be able to export registers report if there are no registers", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = "1500-01-01"
        const endDate = "1500-01-31"
        
        expect(async () => {
             await exportRegistersReportService.execute(user_id, startDate, endDate)
        }).rejects.toThrow("Registers not found!")
    })

    it("Should be able to export registers report", async () => {
        const exportRegistersReportService = new ExportRegistersReportService(registersMemoryRepository)
        
        const user_id = "user_id_1"
        const startDate = "2024-04-01"
        const endDate = "2024-04-31"
        
        const registersBase64 = await exportRegistersReportService.execute(user_id, startDate, endDate)
        
        expect(registersBase64).to.not.equal("")
    })
})
