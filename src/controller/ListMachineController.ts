import { Request, Response } from "express";
import { ListMachineService } from "../services/ListMachineService";

class ListMachineController {
  async handle(request: Request, response: Response) {
    const listMachineService = new ListMachineService();

    const machines = await listMachineService.execute();

    return response.json(machines);
  }
}

export { ListMachineController };