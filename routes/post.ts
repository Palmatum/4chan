import express from "express";
import mongoose from "mongoose";

import Thread from "../models/Thread";
import Post from "../models/Post";

interface IThread extends mongoose.Document {
  title: string;
  content: string;
  posts: Array<string>;
}

interface IPost extends mongoose.Document {
  title: String;
  content: String;
}

const route: express.Router = express.Router();

route.post(
  "/:threadTitle",
  async (req: express.Request, res: express.Response) => {
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
    const content: string = req.body.content;

    const newPost: IPost = new Post({
      title: title,
      content: content,
    });
    await newPost.save();

    const threadTitle: string = req.params.threadTitle;
    const thread: IThread | null = await Thread.findOne({ threadTitle });

    if (thread) {
      thread.posts.push(newPost._id);
      await thread.save();
    } else {
      res.status(400).send("Thread does not exist");
    }
    res.status(201).send(newPost);
  }
);

route.get("/", async (req: express.Request, res: express.Response) => {
  const posts: Array<IPost> = await Post.find();
  res.status(200).send(posts);
});

route.get(
  "/:threadTitle",
  async (req: express.Request, res: express.Response) => {
    const threadTitle: string = req.params.threadTitle;
    const thread: IThread | null = await Thread.findOne({ threadTitle });
    if (thread) {
      const posts: Array<IPost> = await Post.find({
        _id: { $in: thread.posts },
      });
      res.status(200).send(posts);
    } else {
      res.status(400).send("Thread does not exist");
    }
  }
);

export default route;
