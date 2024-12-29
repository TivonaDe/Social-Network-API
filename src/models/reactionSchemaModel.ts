import mongoose from 'mongoose';
import dotenv from 'dotenv';
const { Schema: MongooseSchema } = mongoose;
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined');
}

mongoose.connect(mongoUri);


interface IReaction {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new MongooseSchema<IReaction>(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },          
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      transform: (createdAt: Date) => createdAt.toISOString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
export const Reaction = mongoose.model('Reaction', reactionSchema);
export {};
