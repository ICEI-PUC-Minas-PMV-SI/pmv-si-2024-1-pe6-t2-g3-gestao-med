import { RegisterDTO, RegistersDTO } from "../../../../Registers/RegistersDto/registers.dto";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsMemoryRepository implements IMedicationsRepository {
    
    medications: MedicationsDTO[] = []
    registers: RegisterDTO[] = []

    async register(data: RegistersDTO): Promise<void> {
        this.registers.push(data)
    }

    async edit(data: MedicationsDTO): Promise<MedicationsDTO> {
        const index = this.medications.findIndex(medication => medication.id === data.id);
        this.medications[index] = { ...this.medications[index], ...data };
        return this.medications[index];
    }
    async save(data: MedicationsDTO): Promise<MedicationsDTO> {
        this.medications.push(data)

        return data
    }
    
    async findByUserId(user_id: string): Promise<MedicationsDTO[]> {
        return this.medications.filter(medication => medication.user_id === user_id)
    }

    async findById(medication_id: string): Promise<MedicationsDTO | null> {
        return this.medications.find(medication => medication.id === medication_id) || null
    }

    async delete(medication_id: string): Promise<void> {
        this.medications = this.medications.map(medication => {
            if (medication.id === medication_id) 
                medication.deleted_at = new Date()
            return medication
        })
    }

}