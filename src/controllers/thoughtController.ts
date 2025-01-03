
import { Thought } from '../models/thoughtModel';
import { User } from '../models/userModel';


// GET all thoughts
import { Request, Response } from 'express';

export const getAllThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

// GET a single thought by _id

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {

  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};


// POST to create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json({ message: 'Error creating thought', error: err });
  }
};

// PUT to update a thought by _id

export const updateThought = async (req: Request, res: Response): Promise<void> => {

  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};


// DELETE a thought by _id

export const deleteThought = async (req: Request, res: Response): Promise<void> => {

  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Thought deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
export {};