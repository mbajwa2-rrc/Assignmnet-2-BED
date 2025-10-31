import express, { Express } from "express";
import morgan from "morgan";
import employeeRoute from "./api/v1/routes/employeeRoute";
import branchRoute from "./api/v1/routes/branchRoute";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1", employeeRoute);
app.use("/api/v1", branchRoute);

app.get("/ping", (req, res) => {
  const now = new Date().toISOString(); 
  res.json({ message: "pong", at: now });
});


export default app;