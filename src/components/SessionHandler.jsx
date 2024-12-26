'use server';

import React from 'react'
import AppInitializer from './AppInitializer';
import { redirect } from 'next/navigation';
import { verifyAuth, getUserById } from '@/lib/db';
// import { useRouter } from 'next/navigation';
// import { useState,useEffect } from 'react';

const SessionHandler = async ({ children }) => {

    // original

    const result = await verifyAuth();
    if (!result.user) {
        redirect('/login');
    }
    const user = await getUserById(result.user.id);
    const plainUser = JSON.parse(JSON.stringify(user));

    // server side

    // const response = await fetch('http://localhost:3000/api', { cache: 'no-store' });
    // const result = await response.json();
    // console.log(result);
    // if (!result.user) {
    //     redirect('/login');
    // }

    // client side - the cookie gets deleted as soon as the api is called.

    // const user = await getUserById(result.user.id);
    // const plainUser = JSON.parse(JSON.stringify(user));


    // useEffect(() => {
    //     // const checkCookie = async () => {
    //     // const response = await fetch('http://localhost:3000/api', { cache: 'no-store' });
    //     // const result = await response.text();
    //     //     console.log(result);
    //     //     // if (!result.user) {
    //     //     //     router.push('/login');
    //     //     // }
    //     //     console.log(result.user);
    //     //     // setPlainUser(plainUser);
    //     // }
    //     // checkCookie();
    //     // fetch('http://localhost:3000/api', { cache: 'no-store' }).then((res) => {
    //     //     console.log(res.text());
    //     // }).then((data) => { console.log(data) })

    //     async function checkCookie() {
    //         const response = await fetch('http://localhost:3000/api', { cache: 'no-store' });
    //         const result = await response.text();
    //         console.log(result);
    //         if (!result.user) {
    //             router.push('/login');
    //         }
    //     }
    //     checkCookie();
    // }, [])

    return (
        <AppInitializer user={plainUser}>
            {children}
        </AppInitializer>


    )
}

export default SessionHandler