'use server';

import { getUserById, verifyAuth } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET(request) {
    const result = await verifyAuth();
    console.log(result);
    if (result.user) {
        const user = await getUserById(result.user.id);
        console.log(user);
        return new Response(JSON.stringify({ user: user }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
    else {
        return new Response(JSON.stringify({ user: null }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
