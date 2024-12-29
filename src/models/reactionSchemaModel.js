"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const { Schema: MongooseSchema } = mongoose_1.default;
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
}
mongoose_1.default.connect(mongoUri);
const reactionSchema = new MongooseSchema({
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
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
module.exports = reactionSchema;
exports.Reaction = mongoose_1.default.model('Reaction', reactionSchema);
