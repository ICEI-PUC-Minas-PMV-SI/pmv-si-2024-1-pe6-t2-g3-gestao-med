import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsMemoryRepository implements IMedicationsRepository{
    medications: MedicationsDTO[] = []

    async save(data: MedicationsDTO): Promise<MedicationsDTO> {
        this.medications.push(data)

        return data
    }
    async findByUserid(user_id: string): Promise<MedicationsDTO[]> {
        return this.medications.filter(medication => medication.id === user_id)
    }

}