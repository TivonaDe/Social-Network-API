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
const express = require('express');
const router = express.Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// GET all thoughts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET a single thought by _id
router.get('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST to create a new thought
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = new Thought(req.body);
        yield thought.save();
        yield User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// PUT to update a thought by _id
router.put('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// DELETE a thought by _id
router.delete('/:thoughtId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
module.exports = router;
