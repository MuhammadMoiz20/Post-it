import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, displayName } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists with this email or username',
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      displayName,
    });

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          bio: user.bio,
          profilePicture: user.profilePicture,
          followers: user.followers,
          following: user.following,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          bio: user.bio,
          profilePicture: user.profilePicture,
          followers: user.followers,
          following: user.following,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('followers', 'username displayName profilePicture')
      .populate('following', 'username displayName profilePicture');

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      bio: user.bio,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

