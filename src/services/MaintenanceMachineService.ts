import { getCustomRepository } from "typeorm";
import { MachinesRepositories } from "../repositories/MachinesRepositories";
import { classToPlain } from "class-transformer";

class MaintenanceMachineService {

  async execute(idMachine: string) {
    const machinesRepositories = getCustomRepository(MachinesRepositories);

    const machine = await machinesRepositories.findOne(idMachine);

    machine.status = '2';

    await machinesRepositories.save(machine);
    
    return machine;
  }
}

export { MaintenanceMachineService };