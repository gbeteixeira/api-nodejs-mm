import { getCustomRepository } from "typeorm";
import { SectorsRepositories } from "../repositories/SectorsRepositories";
import { classToPlain } from "class-transformer";

class ListSectorService {

  async execute() {
    const sectorsRepositories = getCustomRepository(SectorsRepositories);

    const sectors = await sectorsRepositories.find();
    
    return classToPlain(sectors);
  }
}

export { ListSectorService };