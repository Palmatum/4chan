import mongoose from "mongoose";

interface IThread extends mongoose.Document {
  title: string;
  content: string;
  posts: Array<string>;
}

const threadSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export default mongoose.model<IThread>("Thread", threadSchema);
