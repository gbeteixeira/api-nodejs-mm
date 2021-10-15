import { getCustomRepository } from "typeorm";
import { MachinesRepositories } from "../repositories/MachinesRepositories";
import { classToPlain } from "class-transformer";

class ListMachineService {

  async execute() {
    const machinesRepositories = getCustomRepository(MachinesRepositories);

    const machines = await machinesRepositories.find();
    
    return classToPlain(machines);
  }
}

export { ListMachineService };