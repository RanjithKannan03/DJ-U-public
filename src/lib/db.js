import mongoose from "mongoose";
import { User, adapter } from "@/models/users";
import { hashPassword } from "./hash";
import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";

mongoose.connect(process.env.MONGO_URL);


export async function createUser(email, username, password) {
    try {
        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) {
            return ({ status: 'error', message: "An account with this email address already exists. Please log in or use a different email." });
        }
        const usernameCheck = await User.findOne({ username: username });
        if (usernameCheck) {
            return ({ status: 'error', message: "The username you have chosen is already taken. Please choose a different username." });
        }

        const hash = await hashPassword(password);
        const newUser = new User({
            email: email,
            password: hash,
            username: username
        });
        await newUser.save();
        return ({ status: 'success', message: "Success", newUser });
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

export async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

export async function getUserById(id) {
    try {
        const user = await User.findById(id);
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            avatarURL: user.avatarURL
        };
    }
    catch (e) {
        console.log(e);
        return ({ status: 'error' });
    }
}

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, "d"), //cookie is deleted in client side in 2 days
    sessionCookie: {
        expires: false, //server side cookie is not deleted
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        },
    }
});

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    if (!sessionCookie) {
        return {
            user: null,
            session: null
        };
    }

    const sessionId = sessionCookie.value;

    if (!sessionId) {
        return {
            user: null,
            session: null
        };
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id); //refresh session
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        else {
            const sessionCookie = lucia.createBlankSessionCookie(); // clear expired cookie
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch (e) {
        // console.log(e);
    }
    return result;
}

export async function destroySession() {
    const { session } = await verifyAuth();
    if (!session) {
        return {
            error: 'Unauthorized'
        }
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();// clear expired cookie
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}