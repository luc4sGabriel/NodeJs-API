import { table } from "console";
import Knex from "knex";

export async function up(knex:Knex) {
    return knex.schema.createTable('location_employees', table => {
        table.integer('location_id')
            .notNullable()
            .references('id')
            .inTable('locations');
        table.integer('employees_id')
        .notNullable()
        .references('id')
        .inTable('employees')
    });
}