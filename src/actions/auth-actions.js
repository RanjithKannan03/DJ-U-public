'use server';

import { createAuthSession, createUser, destroySession, getUserByEmail } from "@/lib/db";
import { checkPassword } from "@/lib/hash";
import { redirect } from "next/navigation";


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export async function login(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || email.trim().length === 0) {
        return { error: "Email and password fields cannot be empty. Please enter your credentials." };
    }
    if (!password || password.trim().length === 0) {
        return { error: "Email and password fields cannot be empty. Please enter your credentials." };
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "No account found with this email. Please check your email or sign up."
        }
    }

    const match = await checkPassword(password, existingUser.password);

    if (!match) {

        return {
            error: "The email or password you entered is incorrect. Please try again."
        }
    }
    await createAuthSession(existingUser._id);
    return redirect('/');

}

export async function register(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get('username');



    if (!email || email.trim().length === 0) {
        return { error: "Email and password fields cannot be empty. Please enter your credentials." };
    }
    if (!password || password.trim().length === 0) {
        return { error: "Email and password fields cannot be empty. Please enter your credentials." };
    }
    if (!isValidEmail(email)) {
        return { error: "Please enter a valid email address." };
    }
    if (password != formData.get('confirmPassword')) {
        return { error: "The passwords you entered do not match. Please try again." }
    }


    const result = await createUser(email, username, password);
    if (result.status === "error") {
        return {
            error: result.message
        }
    }
    await createAuthSession(result.newUser._id);
    return redirect('/');

}

export async function logout() {
    await destroySession();
    return redirect('/');
}
