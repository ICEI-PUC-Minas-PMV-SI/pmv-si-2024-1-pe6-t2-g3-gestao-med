import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsMemoryRepository implements IMedicationsRepository{
    delete(medication_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByUserId(user_id: string): Promise<MedicationsDTO[]> {
        throw new Error("Method not implemented.");
    }
    findById(medication_id: string): Promise<MedicationsDTO | null> {
        throw new Error("Method not implemented.");
    }
    medications: MedicationsDTO[] = []

    async save(data: MedicationsDTO): Promise<MedicationsDTO> {
        this.medications.push(data)

        return data
    }
    async findByUserid(user_id: string): Promise<MedicationsDTO[]> {
        return this.medications.filter(medication => medication.id === user_id)
    }

}