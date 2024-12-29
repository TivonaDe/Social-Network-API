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
const express_1 = require("express");
const userModel_1 = require("../models/userModel"); // Adjust the import path as necessary
const router = (0, express_1.Router)();
// POST to add a friend
router.post('/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = yield userModel_1.User.findById(req.params.userId);
        const friend = yield userModel_1.User.findById(req.params.friendId);
        if (!userModel || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }
        userModel.friends.push(friend._id);
        yield userModel.save();
        res.json(userModel);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE to remove a friend
router.delete('/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findById(req.params.userId);
        user.friends.pull(req.params.friendId);
        yield user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
