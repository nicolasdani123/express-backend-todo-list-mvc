import app from "./app";
import dotenv from "dotenv"
import { getCurrentDate } from "./connection";
dotenv.config();

const port = process.env.PORT  || 3000

app.listen(port, async ()=>{
    const date = await getCurrentDate()
    console.log(`Rodando em http://localhost:${port} em ${date}`)
})
