import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('location_employees', table => {
        table.increments('id').primary();
        table.integer('employee_id')
            .notNullable()
            .references('id')
            .inTable('employees');
        table.integer('location_id')
        .notNullable()
        .references('id')
        .inTable('locations');
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('location_employees');
}