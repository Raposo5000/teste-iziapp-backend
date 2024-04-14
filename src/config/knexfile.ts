import path from "path";

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "../database/database.sqlite3"),
  },
  migrations: {
    directory: path.resolve(__dirname, "../database/migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "../database/seeds"),
  },
  useNullAsDefault: true,
};

export default knexConfig;
