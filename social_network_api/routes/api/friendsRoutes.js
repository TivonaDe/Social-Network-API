// POST to add a friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
      if (!user || !friend) {
        return res.status(404).json({ message: 'User or Friend not found' });
      }
      user.friends.push(friend._id);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE to remove a friend
  router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  