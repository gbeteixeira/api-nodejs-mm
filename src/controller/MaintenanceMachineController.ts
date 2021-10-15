import { Request, Response } from 'express';
import { MaintenanceMachineService } from '../services/MaintenanceMachineService';

class MaintenanceMachineController {

  async handle(request: Request, response: Response) {
    const { idMachine } = request.params;

    const maintenanceMachineService = new MaintenanceMachineService();

    const machine = await maintenanceMachineService.execute(idMachine);

    return response.json(machine);
    
  }
}

export { MaintenanceMachineController };