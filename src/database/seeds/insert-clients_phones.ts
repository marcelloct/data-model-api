import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("clients_phones").del();

  // Inserts seed entries
  await knex('clients_phones').insert([
    { client_id: 1, phone_number: 999999999 },
    { client_id: 1, phone_number: 999999998 },
    { client_id: 2, phone_number: 888888888 },
  ]);
}
