import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String], // Changed from single `tag` to an array
      default: [], // Allows multiple tags for better categorization
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Middleware to update `updatedOn` on save
blogSchema.pre("save", function (next) {
  this.updatedOn = Date.now();
  next();
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
