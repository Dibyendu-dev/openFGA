import express from "express";
import { serverConfig } from "./config/index.js";
const app = express();


app.get("/",(req,res)=>{
    res.send('hello world')
})

app.listen(serverConfig.PORT,()=>{
    console.log(`port is running ${serverConfig.PORT}`)
})
