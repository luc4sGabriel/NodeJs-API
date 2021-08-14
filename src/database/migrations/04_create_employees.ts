import { table } from "console";
import Knex from "knex";

export async function up(knex:Knex) {
    return knex.schema.createTable('employees', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('matricula').notNullable();
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('employess');
}



// name: string;
// 	matricula: string;
// 	locationsIds: [ strgins ]
