import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {
    table.increments().primary();
    table.integer("userId").unsigned();
    table.foreign("userId").references("id").inTable("users");
    table.text("title").notNullable()
    table.enum('status', ['to-do', 'completed']).notNullable()
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tasks");
}
