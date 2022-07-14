import express from "express";
import mongoose from "mongoose";
import Thread from "../models/Thread";
import Post from "../models/Post";

interface IThread extends mongoose.Document {
  title: string;
  content: string;
  posts: Array<string>;
}

const route: express.Router = express.Router();

route.post(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (
      !req.body.title ||
      !req.body.content ||
      req.body.title.trim() === "" ||
      req.body.content.trim() === ""
    ) {
      res.status(400).send("Missing title or content");
      return;
    }

    const title: string = req.body.title;
    const threadTitle: string = title.toLowerCase();
    const content: string = req.body.content;

    threadTitle.split(" ").length > 1
      ? res.status(400).send("Thread title must be a single word")
      : null;

    const thread: IThread | null = await Thread.findOne({ threadTitle });
    thread ? res.status(400).send("Thread already exists") : null;

    const newThread: IThread = new Thread({
      title: threadTitle,
      content: content,
      posts: [],
    });
    await newThread.save();
    res.status(201).send(newThread);
  }
);

route.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const threads: Array<IThread> = await Thread.find();
    res.status(200).send(threads);
  }
);

export default route;
