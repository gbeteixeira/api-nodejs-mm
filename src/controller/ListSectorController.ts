import { Request, Response } from "express";
import { ListSectorService } from "../services/ListSectorService";

class ListSectorController {
  async handle(request: Request, response: Response) {
    const listSectorService = new ListSectorService();

    const sectors = await listSectorService.execute();

    return response.json(sectors);
  }
}

export { ListSectorController };