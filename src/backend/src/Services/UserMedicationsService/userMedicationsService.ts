import { CustomError } from "../../errors/custom.error";
import prismaClient from "../../prisma";

class UserMedicationsService {
  async execute(user_id: string) {
    if (!user_id) throw new CustomError("UserId is required!", 400);

    const medications = await prismaClient.medications.findMany({
      where: {
        user_id: user_id,
        treatment_finished_at: null,
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        stock: true,
        time_to_take: true,
        created_at: true,
      },
    });

    if (!medications) throw new CustomError("Medications not found!", 404);

    return medications;
  }
}

export { UserMedicationsService };
