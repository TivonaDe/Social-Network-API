const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// POST to create a reaction for a thought
const createReaction = async (req, res) => {
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

// DELETE to remove a reaction by reactionId from a thought
const removeReaction = async (req, res) => {
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
