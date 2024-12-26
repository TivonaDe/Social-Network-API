import mongoose from 'mongoose';
const { Schema: MongooseSchema } = mongoose;
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined');
}

mongoose.connect(mongoUri);


const reactionSchema = new MongooseSchema(
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
      get: (timestamp) => timestamp.toISOString(),
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
