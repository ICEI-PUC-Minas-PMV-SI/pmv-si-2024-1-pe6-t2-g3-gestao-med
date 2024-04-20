import { CustomError } from "../../../../errors/custom.error";
import { IUsersRepository } from "../../../Users/Repositories/users.repository";
import { MedicationsDTO } from "../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../Repositories/medications.repository";



class EditMedicationService {

    constructor(
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
    ) { }

    async execute(data:MedicationsDTO) {

        if (!data.user_id) {
            throw new CustomError("User id is required", 400)
        }

        if (!data.id) {
            throw new CustomError("Medication id is required", 400)
        }

        const user = await this.usersRepository.findById(data.user_id)
        if (!user) {
            throw new CustomError("User not found", 404)
        }

        const medication = await this.medicationsRepository.findById(data.id)
        if (!medication) {
            throw new CustomError("Medication not found", 404)
        }

        return await this.medicationsRepository.edit(data)

    }
}
export { EditMedicationService }