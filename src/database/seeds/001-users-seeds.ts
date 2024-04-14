import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").truncate();

  await knex("users").insert([
    { email: "foo@email.com", name: "foo", password: "123" },
    { email: "bar@email.com", name: "bar", password: "123" },
  ]);
}
