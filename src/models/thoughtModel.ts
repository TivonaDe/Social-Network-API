import mongoose from 'mongoose';
const { Schema } = mongoose;
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

mongoose.connect(process.env.MONGODB_URI);

interface IThought {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: mongoose.Types.ObjectId[];
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date) => timestamp,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

export const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
export {};
