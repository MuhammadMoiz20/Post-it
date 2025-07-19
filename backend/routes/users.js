import express from 'express';
import { body } from 'express-validator';
import {
  getUserProfile,
  getUserPosts,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

const validateUpdate = [
  body('displayName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Display name must be between 1 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage('Bio cannot exceed 160 characters'),
];

router.get('/:userId', getUserProfile);
router.get('/:userId/posts', getUserPosts);
router.put('/:userId', protect, upload.single('profilePicture'), validateUpdate, updateUserProfile);

export default router;

