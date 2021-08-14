import { Request, Response } from 'express';
import IEmployee from '../interfaces/employees';
import EmployeeModel from '../models/EmployeeModel';

export default class EmployeeController{
    public async index(request: Request, response: Response){
        const employeeModel = new EmployeeModel();

        const employee = await employeeModel.getAll();

        response.json(employee);
    }
    
    public async create(request: Request, response: Response) {
        const { 
            locationIds
        } = request.body;

        const emp = {
            name,
            matricula:
        } as IEmployee;
        
        const employeeModel = new EmployeeModel();

        const newEmployee = await employeeModel.create(request.body,emp);

        response.json(newEmployee);
    }
}