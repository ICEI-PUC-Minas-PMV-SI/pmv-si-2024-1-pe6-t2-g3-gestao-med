import { CustomError } from "../../../../errors/custom.error";
import { IMedicationsRepository } from "../../Repositories/medications.repository";

class UserMedicationsService {
  constructor(
    private medicationRepository: IMedicationsRepository
  ){}

  async execute(user_id: string) {
    if (!user_id) throw new CustomError("UserId is required!", 400);

    const medications = await this.medicationRepository.findByUserid(user_id)

    if (medications.length === 0) throw new CustomError("Medications not found!", 404);

    return medications;
  }
}

export { UserMedicationsService };
