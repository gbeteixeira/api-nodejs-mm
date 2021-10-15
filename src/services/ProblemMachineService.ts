import { getCustomRepository } from "typeorm";
import { MachinesRepositories } from "../repositories/MachinesRepositories";
import { classToPlain } from "class-transformer";

class ProblemMachineService {

  async execute(idMachine: string) {
    const machinesRepositories = getCustomRepository(MachinesRepositories);

    const machine = await machinesRepositories.findOne(idMachine);

    machine.status = '1';

    await machinesRepositories.save(machine);
    
    return machine;
  }
}

export { ProblemMachineService };