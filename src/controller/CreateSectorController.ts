import { Request, Response } from "express";
import { CreateSectorService } from "../services/CreateSectorService";

class CreateSectorController {

  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSectorService = new CreateSectorService();

    const sector = await createSectorService.execute(name, description);

    return response.json(sector);
  }
}

export { CreateSectorController };