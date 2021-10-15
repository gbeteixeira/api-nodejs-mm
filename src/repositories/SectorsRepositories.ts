import { EntityRepository, Repository } from "typeorm";
import { Sector } from "../entities/Sector";

@EntityRepository(Sector)
class SectorsRepositories extends Repository<Sector> {}

export { SectorsRepositories };