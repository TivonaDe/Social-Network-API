import { Router, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '../../models/userModel'; // Adjust the import path as necessary
const router = Router();

// POST to add a friend
router.post('/:userId/friends/:friendId', async (req: Request<{ userId: string; friendId: string }>, res: Response) => {
    try {
      const userModel = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);
      if (!userModel || !friend) {
        return res.status(404).json({ message: 'User or Friend not found' });
      }
      userModel.friends.push(friend._id);
      await userModel.save();
      res.json(userModel);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE to remove a friend
  router.delete('/:userId/friends/:friendId', async (req: Request<{ userId: string; friendId: string }>, res: Response) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends = user.friends.filter(friendId => friendId.toString() !== req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  export {};