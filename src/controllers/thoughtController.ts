
import { Thought } from '../models/thoughtModel';
import { User } from '../models/userModel';


// GET all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

// GET a single thought by _id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

// POST to create a new thought
const createThought = async (req, res) => {
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
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(400).json({ message: 'Error updating thought', error: err });
  }
};

// DELETE a thought by _id
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
