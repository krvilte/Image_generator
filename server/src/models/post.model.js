import { Schema, model } from "mongoose";
const PostSchema = new Schema(
  {
    name: { type: String, requried: true, trim: true },
    prompt: { type: String, required: true, trim: true },
    photo: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

export default Post;
