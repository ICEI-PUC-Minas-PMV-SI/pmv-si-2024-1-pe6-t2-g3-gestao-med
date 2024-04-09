import { MedicationsDTO } from "../MedicationsDto/medications.dto";

export interface IMedicationsRepository{
    save(data: MedicationsDTO):Promise<MedicationsDTO>
    findByUserid(user_id: string): Promise<MedicationsDTO[]>
}