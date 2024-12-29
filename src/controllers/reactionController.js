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
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
// POST to create a reaction for a thought
const createReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reaction = new Reaction(req.body);
        yield reaction.save();
        const thought = yield Thought.findById(req.params.thoughtId);
        thought.reactions.push(reaction._id);
        yield thought.save();
        res.status(201).json(reaction);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating reaction', error: err });
    }
});
// DELETE to remove a reaction by reactionId from a thought
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought.findById(req.params.thoughtId);
        thought.reactions.pull(req.params.reactionId);
        yield thought.save();
        res.json({ message: 'Reaction removed' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error removing reaction', error: err });
    }
});
module.exports = {
    createReaction,
    removeReaction,
};
