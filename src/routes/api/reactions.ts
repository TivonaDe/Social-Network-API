// POST to create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const reaction = new Reaction(req.body);
      await reaction.save();
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(reaction._id);
      await thought.save();
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE to remove a reaction
  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      res.json({ message: 'Reaction removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  