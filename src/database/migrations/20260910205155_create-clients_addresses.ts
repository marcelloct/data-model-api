import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clients_addresses', (table) => {
    (table.increments('address_id').primary(),
      table
        .integer('client_id')
        .notNullable()
        .references('client_id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'),
      table.string('street').notNullable(),
      table.string('district').notNullable(),
      table.string('address_number').notNullable(),
      table.string('cep', 8).notNullable(),
      table.index(['client_id']),
      table.index(['cep']));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clients_addresses');
}
