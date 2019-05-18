import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouters";

const app = express();
const db = mongoose.connect("mongodb://localhost/petAPI");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
