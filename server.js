import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connecttoMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import path from "path";

import { app,server } from "./socket/socket.js";

const PORT = process.env.PORT || 8000;

const __dirname=path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname,"buzz-talk-frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"buzz-talk-frontend/dist/index.html"))
})

server.listen(PORT,()=>{
    connecttoMongoDB();
     console.log(`Server is running on port ${PORT}`)
});