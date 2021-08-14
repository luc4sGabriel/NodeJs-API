import { create } from 'domain';
import knex from '../database/connection';
import IEmployee from '../interfaces/employees';
import ILocation from '../interfaces/location';

export default class EmployeeModel{
    public async getAll() {
    const employees = await knex('employees').select();

    return employees; 
    }
 
    public async create(Employee: IEmployee, Locations: ILocation[]) { {
        const transaction = await knex.transaction();

        const EmployeeExists = await
            transaction('employees')
                .select()
                .where({ name: Employee.name })
                .first();

        if (EmployeeExists) {
            transaction.rollback();
            return { message: "Employee já cadastrado" };
        }

        const [id] = await transaction('employees').insert(Employee);

        let error = 0;

        const locationEmployees = Locations.map(async (location_id: any) => {
            const validateEmp = await transaction("locations")
                .where({ id: location_id })
                .first();

            if (!validateEmp) {
                error += 1;
                return;
            } else {
                return {
                    employee_id: validateEmp.id,
                    location_id: id
                }
            }
        });

        if ((await Promise.all(locationEmployees)) && error > 0) {
            transaction.rollback();
            return { message: "Algum item enviado, não existe na base de dados" };
        }

        await transaction("location_employees")
            .insert(await Promise.all(locationEmployees));

        await transaction.commit();

        return {
            ...Employee,
            id
        };
    }
}
}
