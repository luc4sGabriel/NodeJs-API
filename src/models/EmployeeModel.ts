import { create } from 'domain';
import knex from '../database/connection';
import IEmployee from '../interfaces/employees';
import ILocation from '../interfaces/location';

export default class EmployeeModel{
    public async getAll() {
    const employees = await knex('employees').select();

    return employees;
    }

    public async create(Location: ILocation, Employee: IEmployee[]) {
        const transaction = await knex.transaction();

        const locationExists = await
            transaction('locations')
                .select()
                .where({ id: Location.id })
                .first();

        if (locationExists){
        await transaction('employees').insert(Employee);
        }
        else {
            return { message: "Location Nao encontrada" };
        }
    }
}

    