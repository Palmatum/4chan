import mongoose from "mongoose";

interface IPost extends mongoose.Document {
  title: String;
  content: String;
}

const postSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPost>("Post", postSchema);
