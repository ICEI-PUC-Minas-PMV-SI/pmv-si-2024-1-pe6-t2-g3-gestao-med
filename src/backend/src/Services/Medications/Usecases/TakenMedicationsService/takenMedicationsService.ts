import { CustomError } from "../../../../errors/custom.error";
import { RegisterDTO } from "../../../Registers/RegistersDto/registers.dto";
import { IUsersRepository } from "../../../Users/Repositories/users.repository";
import { IMedicationsRepository } from "../../Repositories/medications.repository";
import { randomUUID} from 'crypto'

class TakenMedicationService{

    constructor (
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
     ) {}
    
    async execute(data: RegisterDTO) {
        if (!data.user_id) {
            throw new CustomError("User id is required", 400) 
        }  

        if (!data.medication_id)  {
            throw new CustomError("Medication id is required" , 400)
        }

        if (!data.time_taken) {
            throw new CustomError("Time taken is required", 400)
        }

        if (!data.medication_taken) {
            throw new CustomError("Taken is required", 400)
        }
        if (!data.medication_name) {
            throw new CustomError("Medication name is required", 400)
        }
        const user = await this.usersRepository.findById(data.user_id)

        if (!user) {
            throw new CustomError("User not found", 404)
        }

        const medication = await this.medicationsRepository.findById(data.medication_id)
        
        if (!medication) {
            throw new CustomError("Medication not found", 404)
        }

        const medicationRequest = {
            id:randomUUID(),
            ...data
        }
        // precisa validar o formato do time_taken pois pode ser informada uma data e hora no formato errado
        await this.medicationsRepository.register(medicationRequest)

        return "Registrado com sucesso"
    }
}
export {TakenMedicationService}