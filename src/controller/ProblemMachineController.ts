import { Request, Response } from 'express';
import { ProblemMachineService } from '../services/ProblemMachineService';

class ProblemMachineController {

  async handle(request: Request, response: Response) {
    const { idMachine } = request.params;

    const problemMachineController = new ProblemMachineService();

    const machine = await problemMachineController.execute(idMachine);

    return response.json(machine);
    
  }
}

export { ProblemMachineController };