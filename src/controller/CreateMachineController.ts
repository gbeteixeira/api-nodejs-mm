import { Request, Response } from 'express';
import { CreateMachineService } from '../services/CreateMachineService';

class CreateMachineController {

  async handle(request: Request, response: Response) {
    const { name, description, sector_id, reports, status } = request.body;

    const createMachineService = new CreateMachineService();

    const machine = await createMachineService.execute({
      name, 
      description, 
      sector_id, 
      reports,
      status,
    });

    return response.json(machine);
    
  }
}

export { CreateMachineController };