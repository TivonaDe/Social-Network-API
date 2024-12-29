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
Object.defineProperty(exports, "__esModule", { value: true });
const thoughtModel_1 = require("../models/thoughtModel");
const userModel_1 = require("../models/userModel");
// GET all thoughts
const getAllThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield thoughtModel_1.Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ message: 'Error retrieving thoughts', error: err });
    }
});
// GET a single thought by _id
const getThoughtById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughtModel_1.Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: 'Error retrieving thought', error: err });
    }
});
// POST to create a new thought
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = new thoughtModel_1.Thought(req.body);
        yield thought.save();
        yield userModel_1.User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    }
    catch (err) {
        res.status(400).json({ message: 'Error creating thought', error: err });
    }
});
// PUT to update a thought by _id
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughtModel_1.Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(400).json({ message: 'Error updating thought', error: err });
    }
});
// DELETE a thought by _id
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thoughtModel_1.Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting thought', error: err });
    }
});
module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
};
