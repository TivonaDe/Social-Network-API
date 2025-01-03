import { Request, Response } from 'express';
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

export const createReaction = async (req: Request, res: Response) => {
  try {
    const reaction = new Reaction(req.body);
    await reaction.save();

    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(reaction._id);
    await thought.save();

    res.status(201).json(reaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating reaction', error: err });
  }
};

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        thought.reactions.pull(req.params.reactionId);
        await thought.save();

        res.json({ message: 'Reaction removed' });
    } catch (err) {
        res.status(500).json({ message: 'Error removing reaction', error: err });
    }
};

module.exports = {
  createReaction,
  removeReaction,
};
export {};