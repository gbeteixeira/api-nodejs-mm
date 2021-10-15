import { Request, Response } from 'express';
import { RunningMachineService } from '../services/RunningMachineService';

class RunningMachineController {

  async handle(request: Request, response: Response) {
    const { idMachine } = request.params;

    const runningMachineService = new RunningMachineService();

    const machine = await runningMachineService.execute(idMachine);

    return response.json(machine);
    
  }
}

export { RunningMachineController };