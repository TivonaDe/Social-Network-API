import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
const router = Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');
import mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri);


// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:thoughtId', async (req: Request<ParamsDictionary & { thoughtId: string }>, res: Response) => {
router.get('/:thoughtId', async (req: Request<{ thoughtId: string }>, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a thought by _id
router.put('/:thoughtId', async (req: Request<{ thoughtId: string }>, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a thought by _id
router.delete('/:thoughtId', async (req: Request<{ thoughtId: string }>, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
export {};