const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');  // Adjust the path if needed
const Thought = require('../models/Thought');  // Adjust the path if needed
const Reaction = require('../models/Reaction');  // Adjust the path if needed

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
const seedDatabase = async () => {
  try {
    // Remove existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    // Create users
    const userData = await User.insertMany(users);
    console.log('Users seeded successfully.');

    // Create thoughts and associate them with users
    const thoughtData = await Thought.insertMany(thoughts);
    console.log('Thoughts seeded successfully.');

    // Add thoughts to users' thought arrays
    for (let i = 0; i < userData.length; i++) {
      await User.findByIdAndUpdate(userData[i]._id, {
        $push: { thoughts: thoughtData[i]._id },
      });
    }

    // Create reactions and associate them with thoughts
    const thoughtWithReactions = await Thought.find();
    for (let i = 0; i < thoughtWithReactions.length; i++) {
      const thought = thoughtWithReactions[i];
      const reactionData = reactions[i];

      // Create reactions and push them to the thought's reactions array
      const reaction = new Reaction(reactionData);
      await reaction.save();
      await Thought.findByIdAndUpdate(thought._id, {
        $push: { reactions: reaction._id },
      });
    }

    console.log('Reactions seeded successfully.');

    // Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Run the seed script
seedDatabase();
