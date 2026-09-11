import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('clients_phones', (table) => {
    (table.increments('phone_id').primary(),
      table
        .integer('client_id')
        .notNullable()
        .references('client_id')
        .inTable('clients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'),
      table.string('phone_number').notNullable(),
      // prevents that you register same number for the same client
      table.unique(['client_id', 'phone_number']),
      // searching performance
      table.index(['client_id']));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('clients_phones');
}
