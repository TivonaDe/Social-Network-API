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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust the path if needed
const Thought = require('../models/Thought'); // Adjust the path if needed
const Reaction = require('../models/Reaction'); // Adjust the path if needed
// Load environment variables
dotenv.config();
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
// Create sample users
const users = [
    {
        username: 'lernantino',
        email: 'lernantino@gmail.com',
    },
    {
        username: 'johndoe',
        email: 'johndoe@example.com',
    },
    {
        username: 'janedoe',
        email: 'janedoe@example.com',
    },
];
// Create sample thoughts
const thoughts = [
    {
        thoughtText: 'This is a great day!',
        username: 'lernantino',
    },
    {
        thoughtText: 'Learning Node.js is awesome!',
        username: 'johndoe',
    },
    {
        thoughtText: 'I love coding challenges!',
        username: 'janedoe',
    },
];
// Create sample reactions
const reactions = [
    {
        reactionBody: 'I agree, it’s a great day!',
        username: 'johndoe',
    },
    {
        reactionBody: 'Yes, Node.js is amazing!',
        username: 'janedoe',
    },
    {
        reactionBody: 'Coding challenges are fun!',
        username: 'lernantino',
    },
];
// Function to seed the database
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Remove existing data
        yield User.deleteMany({});
        yield Thought.deleteMany({});
        // Create users
        const userData = yield User.insertMany(users);
        console.log('Users seeded successfully.');
        // Create thoughts and associate them with users
        const thoughtData = yield Thought.insertMany(thoughts);
        console.log('Thoughts seeded successfully.');
        // Add thoughts to users' thought arrays
        for (let i = 0; i < userData.length; i++) {
            yield User.findByIdAndUpdate(userData[i]._id, {
                $push: { thoughts: thoughtData[i]._id },
            });
        }
        // Create reactions and associate them with thoughts
        const thoughtWithReactions = yield Thought.find();
        for (let i = 0; i < thoughtWithReactions.length; i++) {
            const thought = thoughtWithReactions[i];
            const reactionData = reactions[i];
            // Create reactions and push them to the thought's reactions array
            const reaction = new Reaction(reactionData);
            yield reaction.save();
            yield Thought.findByIdAndUpdate(thought._id, {
                $push: { reactions: reaction._id },
            });
        }
        console.log('Reactions seeded successfully.');
        // Close the connection
        mongoose_1.default.connection.close();
    }
    catch (err) {
        console.error('Error seeding database:', err);
    }
});
// Run the seed script
seedDatabase();
