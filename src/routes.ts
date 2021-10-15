import { Router } from "express";

// imports middlewares
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

// imports creates
import { CreateMachineController } from "./controller/CreateMachineController";
import { CreateSectorController } from "./controller/CreateSectorController";
import { CreateUserController } from "./controller/CreateUserController";

// imports authentication
import { AuthenticateUserController } from "./controller/AuthenticateUserController";

// imports Lists
import { ListMachineController } from "./controller/ListMachineController";
import { ListSectorController } from "./controller/ListSectorController";

import { ReportMachineController } from "./controller/ReportMachineController";

// Machines Status
import { RunningMachineController } from "./controller/RunningMachineController";
import { ProblemMachineController } from "./controller/ProblemMachineController";
import { MaintenanceMachineController } from "./controller/MaintenanceMachineController";

const router = Router();

// creates
const createSectorController = new CreateSectorController();
const createMachineController = new CreateMachineController();
const createUserController = new CreateUserController();

// lists
const listMachineController = new ListMachineController();
const listSectorController = new ListSectorController();

// Reports
const reportMachineController = new ReportMachineController();

// Machines Status
const runningMachineController = new RunningMachineController();
const problemMachineController = new ProblemMachineController();
const maintenanceMachineController = new MaintenanceMachineController();

// Authenticate
const authenticateUserController = new AuthenticateUserController();

// post
router.post('/sector/new', ensureAuthenticated, ensureAdmin, createSectorController.handle);

router.post('/machine/new', ensureAuthenticated, ensureAdmin, createMachineController.handle);

router.post('/user/new', ensureAuthenticated, ensureAdmin, createUserController.handle);

router.post("/login", authenticateUserController.handle);

// get
router.get('/machines', ensureAuthenticated, ensureAdmin, listMachineController.handle);

router.get('/machines/:idMachine/report', ensureAuthenticated, reportMachineController.handle);

router.get('/sectors', ensureAuthenticated, ensureAdmin, listSectorController.handle);

// Machines Status
router.post('/machines/:idMachine/running', ensureAuthenticated, runningMachineController.handle);

router.post('/machines/:idMachine/problem', ensureAuthenticated, problemMachineController.handle);

router.post('/machines/:idMachine/maintenance', ensureAuthenticated, maintenanceMachineController.handle);


// export
export { router };