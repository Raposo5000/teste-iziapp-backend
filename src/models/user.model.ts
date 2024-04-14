import db from "../database/db";

const User = {
  register: async (email: string, name: string, password: string) => {
    try {
      const newUser = await db("users").insert({ email, name, password });
      return newUser;
    } catch (error) {
      throw new Error(String(error));
    }
  },

  findByEmail: async (email: string) => {
    try {
      const user = await db
        .select(["id", "email"])
        .from("users")
        .where({ email: email, })
        .first();
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  },

  findByEmailAndPassword: async (email: string, password: string) => {
    try {
      const user = await db
        .select(["id", "email", "name"])
        .from("users")
        .where({ email: email, password: password })
        .first();
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  },
};

export default User;
