import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose
  .connect(
    "mongodb+srv://AravindhanAK:AravindhanK@recipes.2tcrgiz.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

app.listen(port, () => console.log("server started"));
