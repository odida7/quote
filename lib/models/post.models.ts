import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
   text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
