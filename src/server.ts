import express from "express";
import cors from "cors";
import routes from "./routes"

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes)

server.get("/health", async (req, res) => {
  return res.send("Server running!");
});

const startServer = () => {
  server.listen(process.env.PORT, () =>
    console.log(`server online!\n/health to check it!`)
  );
};

export default {
  startServer
}