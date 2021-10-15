import { getCustomRepository } from "typeorm";
import { MachinesRepositories } from "../repositories/MachinesRepositories";
import { SectorsRepositories } from "../repositories/SectorsRepositories";


interface IMachineRequest {
  name: string;
  description: string;
  sector_id: string;
  reports: string;
  status?: string;
}

class CreateMachineService {

  async execute( {name, description, sector_id, reports, status = '0'} : IMachineRequest ) {
    const machinesRepositories = getCustomRepository(MachinesRepositories);
    const sectorsRepositories = getCustomRepository(SectorsRepositories);

    const machineAlreadyExists = await machinesRepositories.findOne({
      name
    });

    if(machineAlreadyExists) {
      throw new Error("Machine already exists!");
    }

    const sectorExists = await sectorsRepositories.findOne(sector_id);

    if(!sectorExists) {
      throw new Error("Sector does not exist!");
    }

    const machine = machinesRepositories.create({
      name,
      description,
      sector_id,
      reports,
      status,
    });

    await machinesRepositories.save(machine);

    return machine;

  }
}

export { CreateMachineService };