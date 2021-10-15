import { getCustomRepository } from "typeorm";
import { SectorsRepositories } from "../repositories/SectorsRepositories";


class CreateSectorService {
  
  async execute(name: string, description: string) {
      const sectorRepositories = getCustomRepository(SectorsRepositories);

      if (!name) {
        throw new Error("Incorrect name!");
      }

      const sectorAlreadyExists = await sectorRepositories.findOne({
        name
      });

      if(sectorAlreadyExists) {
        throw new Error("Sector already exists!");
      }

      const sector = sectorRepositories.create({
        name,
        description,
      });

      await sectorRepositories.save(sector);

      return sector;

  }
}

export { CreateSectorService };