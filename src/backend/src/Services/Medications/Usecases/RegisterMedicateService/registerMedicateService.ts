import { CustomError } from "../../../../errors/custom.error";
import { MedicationsDTO } from "../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../Repositories/medications.repository";

class RegisterMedicateService{
    constructor(private medicationRepository: IMedicationsRepository){

    }
    async execute(data: MedicationsDTO){
        if(!data.user_id)throw new CustomError("User id is required", 400)
        

        const saveMedication = await this.medicationRepository.save(data)

        return saveMedication
    }
}

export{RegisterMedicateService}