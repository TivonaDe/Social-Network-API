import { Router } from 'express';
import {  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} from '../../controllers/thoughtController'; // Adjust the import path as necessary
const router = Router();
import mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri);


// GET all thoughts
router.route('/').get(getAllThoughts);

// GET a single thought by _id
router.route('/:thoughtId').get(getThoughtById);

// POST to create a new thought
router.route('/').post(createThought);
// PUT to update a thought by _id
router.route('/:thoughtId').put(updateThought);

// DELETE a thought by _id
router.route('/:thoughtId').delete(deleteThought);

module.exports = router;
export {};