import { Schema, model, Document } from 'mongoose';

interface IFriend extends Document {
    name: string;
    email: string;
    createdAt: Date;
}

const friendSchema = new Schema<IFriend>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Friend = model<IFriend>('Friend', friendSchema);

export default Friend;