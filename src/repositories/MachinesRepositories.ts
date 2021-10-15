import { EntityRepository, Repository } from "typeorm";
import { Machine } from "../entities/Machine";

@EntityRepository(Machine)
class MachinesRepositories extends Repository<Machine> {}

export { MachinesRepositories };