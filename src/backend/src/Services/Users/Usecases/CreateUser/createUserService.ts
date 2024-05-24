import { CustomError } from "../../../../errors/custom.error";
import { randomUUID } from "crypto";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../../Repositories/users.repository";
import { UserRequestDTO } from "../../UserDto/user.dto";
import { Gender } from "@prisma/client";

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: UserRequestDTO) {

    data.date_of_birth = new Date(data.date_of_birth)
    // Check if the user inserted all the data
    if (!data.name) throw new CustomError("Name is required", 400);
    if (!data.email) throw new CustomError("Email is required", 400);
    if (!data.password) throw new CustomError("Password is required", 400);
    // if (!data.phone) throw new CustomError("Phone is required", 400);
    if (!data.date_of_birth) throw new CustomError("Date of birth is required", 400);
    if (!data.gender) throw new CustomError("Gender is required", 400);


    if (!(data.date_of_birth instanceof Date)) throw new CustomError("Invalid date format", 400);

    // Check if the user entered a valid gender
    if (
      data.gender.toUpperCase() !== "MALE" &&
      data.gender.toUpperCase() !== "FEMALE" &&
      data.gender.toUpperCase() !== "OTHER"
    ) {
      throw new CustomError("Invalid gender!", 400);
    }

    if (data.gender.toUpperCase() === "MALE") data.gender = Gender.MALE;
    if (data.gender.toUpperCase() === "FEMALE") data.gender = Gender.FEMALE;
    if (data.gender.toUpperCase() === "OTHER") data.gender = Gender.OTHER;

    // const phoneRegex = /^\d{11}$/;

    // Check if the user entered a valid phone number
    // if (!phoneRegex.test(data.phone)) {
    //   throw new CustomError("Invalid phone number!", 400);
    // }

    const today = new Date();

    // Check if the user entered a valid date of birth
    if (new Date(data.date_of_birth).getTime() > today.getTime()) {
      throw new CustomError("Date of birth must be before today!", 400);
    }

    //Check if email is already registered
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new CustomError("User already exists", 400);
    }

    //password crypto
    const passwordHash = await hash(data.password, 8);

    data.password = passwordHash;

    //create Id to user
    const userRequest = {
      id: randomUUID(),
      ...data,
    };
    //create user
    const user = await this.userRepository.save(userRequest);

    return user;
  }
}

export { CreateUserService };
