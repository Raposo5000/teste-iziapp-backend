import { Request, Response } from "express";
import TaskModel from "../models/task.model";

const TaskController = {
  createTask: async (request: Request, response: Response) => {
    const userId = request.headers.userId;
    const { title } = request.body;

    if (!title)
      return response
        .status(400)
        .json({ error: "Something wrong with task informations." });

    try {
      const task = await TaskModel.create(Number(userId), title);
      return response.status(201).json(task);
    } catch (error) {
      return response.status(500).json({ error: "Server error..." });
    }
  },

  getUserTasks: async (request: Request, response: Response) => {
    const userId = request.headers.userId;

    try {
      const tasks = await TaskModel.findByUserId(Number(userId));
      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(500).json({ error: "Server error..." });
    }
  },

  updateTask: async (request: Request, response: Response) => {
    const userId = request.headers.userId;
    const bodyRequest = request.body;

    if (!bodyRequest.taskId)
      return response
        .status(400)
        .json({ error: "Something wrong with task informations." });
    
    const updating = {...bodyRequest}
    delete updating.taskId;
    delete updating.userId;

    try {
      const task = await TaskModel.update(Number(userId), bodyRequest.taskId, updating);
      return response.status(200).json(task);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Server error..." });
    }
  },

  deleteTask: async (request: Request, response: Response) => {
    const userId = request.headers.userId;
    const { taskId } = request.params;

    if (!taskId)
      return response
        .status(400)
        .json({ error: "Something wrong with taskId param." });

    try {
      await TaskModel.delete(Number(userId), taskId);
      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Server error..." });
    }
  },
};

export default TaskController;
