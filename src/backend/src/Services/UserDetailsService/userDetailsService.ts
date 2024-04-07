import { CustomError } from "../../errors/custom.error";
import prismaClient from "../../prisma";

class UserDetailsService {
  async execute(user_id: string) {
    if (!user_id) throw new CustomError("UserId is required!", 400);

    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        isAdmin: true,
        name: true,
        email: true
      }
    });

    if (!user) throw new CustomError("User not found!", 404);

    return user;
  }
}

export { UserDetailsService };
