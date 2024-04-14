import db from "../database/db";

const TaskModel = {
  findByUserId: async (userId: number) => {
    try {
      const tasks = await db("tasks").where({ userId: userId });
      return tasks;
    } catch (error) {
      throw new Error(String(error));
    }
  },

  create: async (userId: number, title: string, status = "to-do") => {
    try {
      const task = await db("tasks")
        .insert({ userId: userId, title, status })
        .returning("*");
      return task[0];
    } catch (error) {
      throw new Error(String(error));
    }
  },

  update: async (
    userId: number | string,
    taskId: number | string,
    updating: any
  ) => {
    try {
      const task = await db("tasks")
        .update({ ...updating })
        .where({ userId: userId, id: taskId })
        .returning("*");
      return task[0];
    } catch (error) {
      throw new Error(String(error));
    }
  },

  delete: async (userId: number | string, taskId: number | string) => {
    try {
      await db("tasks").where({ userId: userId, id: taskId }).del();
    } catch (error) {
      throw new Error(String(error));
    }
  },
};

export default TaskModel;
