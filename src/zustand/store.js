import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set, get) => ({
            user: null,
            loginUser: (user) => set({ user: user }),
            logoutUser: () => set({ user: null })
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
);

export const songStore = create(
    (set, get) => ({
        currentSong: null,
        setCurrentSong: (song) => set({ currentSong: song }),
        clearCurrentSong: () => set({ currentSong: null })
    })
);


export const songQueueStore = create(
    (set, get) => ({
        queue: [],
        setSongQueue: (queue) => set({ queue: queue })
    })
);