import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [280, 'Post cannot exceed 280 characters'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
postSchema.index({ author: 1, createdAt: -1 });

const Post = mongoose.model('Post', postSchema);

export default Post;

