import mongoose from "mongoose";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    avatarURL: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    },
});

const User = mongoose.models.User ?? mongoose.model('User', userSchema);

const sessionSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        expires_at: {
            type: Date,
            required: true
        }
    },
    { _id: false }
)

const Session = mongoose.models.Session ?? mongoose.model(
    "Session",
    sessionSchema
);

const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("users")
);

export { User, Session, adapter };