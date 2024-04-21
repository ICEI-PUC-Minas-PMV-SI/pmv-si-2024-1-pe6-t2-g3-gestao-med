import { CustomError } from "../../../../errors/custom.error";
import { IUsersRepository } from "../../../Users/Repositories/users.repository";
import { IMedicationsRepository } from "../../Repositories/medications.repository";

class TakenMedicationService{

    constructor (
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
     ) {}
    
    async execute(user_id: string, medication_id: string , time_taken: Date) {
        if (!user_id) {
            throw new CustomError("User id is required", 400) 
        }  

        if (!medication_id)  {
            throw new CustomError("Medication id is required" , 400)
        }

        if (!time_taken) {
            throw new CustomError("Time taken is required", 400)
        }

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new CustomError("User not found", 404)
        }

        const medication = await this.medicationsRepository.findById(medication_id)
        
        if (!medication) {
            throw new CustomError("Medication not found", 404)
        }

        // precisa validar o formato do time_taken pois pode ser informada uma data e hora no formato errado
        await this.medicationsRepository.register(user_id, medication_id, time_taken)
    }
}
export {TakenMedicationService}