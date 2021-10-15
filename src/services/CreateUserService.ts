import { getCustomRepository } from "typeorm";
import { SectorsRepositories } from "../repositories/SectorsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password?: string;
  sector_id: string;
  admin?: boolean;
}

function gerarPassword() {
  return Math.random().toString(36).slice(-10);
}

class CreateUserService {

  async execute({ name, email, password = gerarPassword(), sector_id, admin = false } : IUserRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const sectorsRepositories = getCustomRepository(SectorsRepositories);

    const emailAlreadyExists = await usersRepositories.findOne({ 
      name
    })

    if (emailAlreadyExists) {
      throw new Error("Email already exists!");
    }

    const sectorExists = await sectorsRepositories.findOne(sector_id);

    if(!sectorExists) {
      throw new Error("Sector does not exist!");
    }

    const passwordHash = await hash(password, 8);

    const user = await usersRepositories.create({
      name,
      email,
      password: passwordHash,
      sector_id,
      admin,
    });

    await usersRepositories.save(user);

    return user;
    
  }
}

export{ CreateUserService };