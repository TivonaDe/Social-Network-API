const User = require('../models/User');
const Thought = require('../models/Thought');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

// GET a single user by _id and populate thoughts and friends
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};

// POST a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
};

// PUT to update a user by _id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err });
  }
};

// DELETE a user by _id and associated thoughts
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ userId: req.params.userId }); // Remove associated thoughts
    res.json({ message: 'User and thoughts deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

// POST to add a friend
const addFriend = async (req, res) => {
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
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
};

// DELETE to remove a friend
const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
