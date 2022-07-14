import express from "express";
import mongoose from "mongoose";

import threadRoute from "./routes/thread";
import postRoute from "./routes/post";

const app: express.Application = express();
const PORT: number = 3000;

const main = async (): Promise<void> => {
  await mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/thread", threadRoute);
  app.use("/post", postRoute);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch(console.error);
