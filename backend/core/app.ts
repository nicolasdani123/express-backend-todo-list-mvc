import express from "express"
import cors from "cors"
import router from "./router/task.router.js";
import errorHandle from "./middleware/errorHandle.js"; // Importe o errorHandle

const app = express();
app.use(cors())
app.use(express.json())
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.use(router);
// Substitua app.use(asyncHandle) por app.use(errorHandle)
app.use(errorHandle);

export default app;