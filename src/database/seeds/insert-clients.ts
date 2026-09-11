import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  // await knex("clients").del();

  // Inserts seed entries
  await knex('clients').insert([
    {
      name: 'John',
      cpf: 1234567890,
      email: 'john@test.com',
    },
    {
      name: 'Jane',
      cpf: 1234567891,
      email: 'jane@test.com',
    },
  ]);
}
