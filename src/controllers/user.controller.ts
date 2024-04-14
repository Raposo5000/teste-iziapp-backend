import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import AuthConfig from "../config/auth";

const UserControllers = {
  register: async (request: Request, response: Response) => {
    const { email, name, password } = request.body;

    if (
      !email ||
      !name ||
      !password ||
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof password !== "string"
    ) {
      return response
        .status(400)
        .json({ error: "something wrong with user informations." });
    }

    try {

      const user = await UserModel.findByEmail(email)

      if(user) {
        return response
        .status(409)
        .json({ error: "User exists!" });
      }


      await UserModel.register(email, name, password);
      return response.status(201).json({ success: "user created!" });
    } catch (error) {
      return response.status(500).json({ error: "server error..." });
    }
  },

  login: async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password)
      return response.status(400).json({ error: "Missing auth informations." });

    try {
      const user = await UserModel.findByEmailAndPassword(email, password);

      if (!user) return response.status(400).json({ error: "Invalid user." });

      const token = jwt.sign({ id: user.id }, AuthConfig.JWTsecretKey, {
        expiresIn: AuthConfig.expiresIn,
      });

      return response.json({ ...user, token });
    } catch (error) {
      return response.status(500).json({ error: "server error..." });
    }
  },
};

export default UserControllers;
