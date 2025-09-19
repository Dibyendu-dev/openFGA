import express from "express";
import { serverConfig } from "./config/index.js";
import { connectDB } from "./config/dbConfig.js";
const app = express();


app.get("/",(req,res)=>{
    res.send('hello world')
})

app.listen(serverConfig.PORT,async ()=>{
    console.log(`port is running on http://localhost: ${serverConfig.PORT}`);
    await connectDB();
})
