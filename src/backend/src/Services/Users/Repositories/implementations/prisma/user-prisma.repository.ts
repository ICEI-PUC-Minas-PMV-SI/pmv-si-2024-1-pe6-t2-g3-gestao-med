import prismaClient from "../../../../../prisma";
import { UserResponseDTO, UserAuthDTO } from "../../../UserDto/user.dto";
import { IUsersRepository } from "../../users.repository";
import { Gender } from "@prisma/client"

export class UserPrismaRepository implements IUsersRepository {
  async update(email: string, name: string, date_of_birth: Date, gender: Gender, user_id: string): Promise<void> {
    await prismaClient.user.update({
      where:{
        id: user_id
      },
      data:{
        email,
        name,
        date_of_birth,
        gender
      }
    })
  }
  async findByEmail(email: string): Promise<UserAuthDTO | null> {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        isAdmin: true,
        email: true,
        name: true,
        date_of_birth: true,
        gender: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async save(data: UserAuthDTO): Promise<void> {
    await prismaClient.user.create({
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        password: data.password,
        created_at: new Date(),
      },
    });
  }
}
