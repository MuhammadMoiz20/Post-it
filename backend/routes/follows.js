import express from 'express';
import { followUser, getFollowers, getFollowing } from '../controllers/followController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/:userId', protect, followUser);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

export default router;

