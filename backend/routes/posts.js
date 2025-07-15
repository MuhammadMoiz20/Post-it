import express from 'express';
import { body } from 'express-validator';
import {
  createPost,
  getTimeline,
  getPost,
  deletePost,
  likePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

const validatePost = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content is required')
    .isLength({ max: 280 })
    .withMessage('Post cannot exceed 280 characters'),
];

router.post('/', protect, upload.single('image'), validatePost, createPost);
router.get('/', protect, getTimeline);
router.get('/:postId', getPost);
router.delete('/:postId', protect, deletePost);
router.post('/:postId/like', protect, likePost);

export default router;

