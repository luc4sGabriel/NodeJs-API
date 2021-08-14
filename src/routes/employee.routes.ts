import { Router } from "express";
import EmployeeController from "../controllers/EmployeeController";

const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.get('/', employeeController.index);

export default employeeRouter;