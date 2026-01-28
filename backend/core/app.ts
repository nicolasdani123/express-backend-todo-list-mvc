import express from "express"
import cors from "cors"
import taskRouter from "./router/task.router.js";
import userRouter from "./router/user.router.js"
import errorHandle from "./middleware/errorHandle.js"; // Importe o errorHandle

const app = express();
app.use(cors())
app.use(express.json())
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use(taskRouter);
app.use(userRouter)
app.use(errorHandle);

export default app;