"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../models/User');
const Thought = require('../models/Thought');
// GET all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    }
});
// GET a single user by _id and populate thoughts and friends
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.userId).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err });
    }
});
// POST a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User(req.body);
        yield user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
});
// PUT to update a user by _id
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating user', error: err });
    }
});
// DELETE a user by _id and associated thoughts
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield Thought.deleteMany({ userId: req.params.userId }); // Remove associated thoughts
        res.json({ message: 'User and thoughts deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});
// POST to add a friend
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.userId);
        const friend = yield User.findById(req.params.friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        user.friends.push(friend._id);
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding friend', error: err });
    }
});
// DELETE to remove a friend
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.userId);
        user.friends.pull(req.params.friendId);
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Error removing friend', error: err });
    }
});
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
};
