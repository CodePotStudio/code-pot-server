import serverless from "serverless-http";
import express from "express";

const app = express();

app.get("/", (req, res) => res.send("hello"));

export const expressHandler = serverless(app);
