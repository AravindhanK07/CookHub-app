import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

//Middle ware
app.use(express.json());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  "mongodb+srv://AravindhanAK:Aravindhan003@recipes.2tcrgiz.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes"
);

app.listen(3000, () => console.log("server started"));
