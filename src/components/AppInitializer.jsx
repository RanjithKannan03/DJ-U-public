'use client';

import React, { useEffect } from 'react';
import { userStore } from '@/zustand/store';

const AppInitializer = (props) => {
    const loginUser = userStore((state) => state.loginUser);
    useEffect(() => {
        loginUser(props.user);
    }, []);
    return (
        <>
            {props.children}
        </>
    )
}

export default AppInitializer