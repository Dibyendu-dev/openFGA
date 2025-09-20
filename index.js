import express from "express";
import cors from "cors";
import { serverConfig } from "./config/index.js";
import { connectDB } from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/todos", todoRouter);

app.listen(serverConfig.PORT, async () => {
  console.log(`port is running on http://localhost: ${serverConfig.PORT}`);
  await connectDB();
});
