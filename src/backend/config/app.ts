import express from "express"
import cors from "cors";
import routerUsers from "../router/userRouter"
const app = express();

app.use(cors());
app.use(express.json())
app.use("/users",routerUsers)

app.get("/",(_req,res)=>{
 return res.send("Servidor connectado com sucesso!")
})



export default app