import { Request, Response } from 'express';
import Friend from '../models/friends';

class FriendController {
    // Get all friends
    public async getAllFriends(req: Request, res: Response): Promise<void> {
        try {
            const friends = await Friend.find();
            res.status(200).json(friends);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching friends', error });
        }
    }

    // Get a single friend by ID
    public async getFriendById(req: Request, res: Response): Promise<void> {
        try {
            const friend = await Friend.findById(req.params.id);
            if (friend) {
                res.status(200).json(friend);
            } else {
                res.status(404).json({ message: 'Friend not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching friend', error });
        }
    }

    // Add a new friend
    public async addFriend(req: Request, res: Response): Promise<void> {
        try {
            const newFriend = new Friend(req.body);
            const savedFriend = await newFriend.save();
            res.status(201).json(savedFriend);
        } catch (error) {
            res.status(500).json({ message: 'Error adding friend', error });
        }
    }

    // Update a friend by ID
    public async updateFriend(req: Request, res: Response): Promise<void> {
        try {
            const updatedFriend = await Friend.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (updatedFriend) {
                res.status(200).json(updatedFriend);
            } else {
                res.status(404).json({ message: 'Friend not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating friend', error });
        }
    }

    // Delete a friend by ID
    public async deleteFriend(req: Request, res: Response): Promise<void> {
        try {
            const deletedFriend = await Friend.findByIdAndDelete(req.params.id);
            if (deletedFriend) {
                res.status(200).json({ message: 'Friend deleted' });
            } else {
                res.status(404).json({ message: 'Friend not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting friend', error });
        }
    }
}

export default new FriendController();
export { FriendController };