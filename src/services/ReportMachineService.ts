import { getCustomRepository } from "typeorm";
import { MachinesRepositories } from "../repositories/MachinesRepositories";
import { classToPlain } from "class-transformer";

class ReportMachineService {

  async execute(idMachine: string) {
    const machinesRepositories = getCustomRepository(MachinesRepositories);

    const machines = await machinesRepositories.findOne(idMachine);

    return classToPlain(machines);

  }
}

export { ReportMachineService };