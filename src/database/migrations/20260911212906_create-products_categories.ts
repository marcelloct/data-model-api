import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products_categories', (table) => {
    (table
      .integer('product_id')
      .notNullable()
      .references('product_id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE'),
      table
        .integer('category_id')
        .notNullable()
        .references('category_id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE'),
      table.primary(['product_id', 'category_id']),
      table.index(['product_id']),
      table.index(['category_id']));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products_categories');
}
