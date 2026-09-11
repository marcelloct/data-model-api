import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("clients_addresses").del();

  // Inserts seed entries
  await knex('clients_addresses').insert([
    {
      client_id: 1,
      street: 'sample #1',
      district: 'dist',
      address_number: '112',
      cep: '12345678',
    },
  ]);
}
