import { RegistersDTO } from "../../Registers/RegistersDto/registers.dto";
import { MedicationsDTO } from "../MedicationsDto/medications.dto";

export interface IMedicationsRepository{
    save(data: MedicationsDTO): Promise<MedicationsDTO>
    findByUserId(user_id: string): Promise<MedicationsDTO[]>
    findById(medication_id: string): Promise<MedicationsDTO | null>  
    delete(medication_id: string): Promise<void>
    register(data: RegistersDTO): Promise<void>
    edit(data: MedicationsDTO): Promise<MedicationsDTO>
}