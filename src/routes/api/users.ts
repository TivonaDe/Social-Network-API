import { Thought } from "../../models/thoughtModel";
import { Router, Request, Response } from 'express';
import {  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser } from '../../controllers/userController';
const User = require('../../models/User');
const mongoose = require('mongoose');
const router = Router();
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// GET all users
router.get('/', getAllUsers);
router.post('/', createUser);

// GET a single user by ID with populated thoughts and friends
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// POST a new user
router.post('/', createUser);


// DELETE a user by its _id (BONUS: Remove thoughts)
router.delete('/:userId', deleteUser);

module.exports = router;

export {};