import { CustomError } from "../../../../errors/custom.error";
import { Medication, MedicationsDTO } from "../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../Repositories/medications.repository";
import {randomUUID} from "crypto"
class RegisterMedicateService{
    constructor(private medicationRepository: IMedicationsRepository){

    }
    async execute(data: Medication){
        if(!data.user_id)throw new CustomError("User id is required", 400)
        if(!data.name)throw new CustomError("Name is required", 400)
        if(!data.description)throw new CustomError("Descripton is required", 400)
        if(!data.stock)throw new CustomError("Stock is required",400)
        if(!data.time_to_take)throw new CustomError("Time to take is required", 400)
        //if(!data.treatment_finished_at)throw new CustomError("Treatment finished at is required", 400)
        // if(!data.created_at)throw new CustomError("Created at is required", 400)
        // if(!data.updated_at)throw new CustomError("Updated at is required", 400)

        const medicationRequest = {
            id: randomUUID(),
            ...data
        }
        const saveMedication = await this.medicationRepository.save(medicationRequest)

        return saveMedication
    }
}

export{RegisterMedicateService}