import { MedicationsDTO } from "../MedicationsDto/medications.dto";

export interface IMedicationsRepository{
    save(data: MedicationsDTO): Promise<MedicationsDTO>
    findByUserId(user_id: string): Promise<MedicationsDTO[]>
    findById(medication_id: string): Promise<MedicationsDTO | null>  
    delete(medication_id: string): Promise<void>
    register(user_id: string, medication_id: string, medication_name: string, time_taken: Date, taken: boolean): Promise<void>
    edit(data: MedicationsDTO): Promise<MedicationsDTO>
}