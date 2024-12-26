'use server';

import { verifyAuth, getUserById } from "@/lib/db";
import { redirect } from "next/navigation";

export async function checkCookie() {
    const result = await verifyAuth();
    if (!result.user) {
        redirect('/login');
    }
    const user = await getUserById(result.user.id);
    const plainUser = JSON.parse(JSON.stringify(user));
    return plainUser;
}