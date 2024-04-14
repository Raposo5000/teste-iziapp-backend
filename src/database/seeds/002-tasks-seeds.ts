import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("tasks").truncate();

  await knex("tasks").insert([
    { userId: 1, title: "todo-1", status: "to-do" },
    { userId: 1, title: "todo-2", status: "to-do" },
    { userId: 1, title: "todo-3", status: "completed" },
    { userId: 1, title: "todo-4", status: "completed" },
    { userId: 1, title: "todo-5", status: "to-do" },
  ]);
}
