import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import songs from './utils/songs.js';

// Sockets with express

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://dj-u.vercel.app",
        methods: ["GET", "POST"]
    }
});

let playlist = songs.map((song) => {
    return { ...song, votes: 0 }
});


let currentSong = null;
let songQueue = [];
let connectedUsers = [];
const userCooldowns = {};

app.get('/', (req, res) => {
    res.json({ songs: playlist });

});

io.on('connection', (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);


    // if (currentSong) {
    //     const elapsedTime = Date.now() - currentSong.startTime;
    //     socket.emit('playSong', {
    //         songId: currentSong.id,
    //         startTime: elapsedTime
    //     });
    // }

    socket.on('user', (data) => {
        console.log(data);
        if (!connectedUsers.includes(data.userId)) {
            connectedUsers.push(data.userId);
        }
        console.log(connectedUsers);
        // if (currentSong) {
        //     const elapsedTime = Date.now() - currentSong.startTime;
        //     socket.emit('playSong', {
        //         songId: currentSong.id,
        //         startTime: elapsedTime
        //     });
        // }

    })

    socket.on('playSong', (data) => {
        if (currentSong) {
            const elapsedTime = Date.now() - currentSong.startTime;
            socket.emit('playSong', {
                songId: currentSong.id,
                startTime: elapsedTime
            });
        }
        else {
            // const song = songs[0];
            // currentSong = song;
            // currentSong.startTime = Date.now();
            // const startTime = 0;
            // socket.emit('playSong', {
            //     songId: song.id,
            //     startTime: startTime
            // })
            playNextSong();
        }
    })

    socket.on('vote', (data) => {

        const now = Date.now();

        console.log(`User ${socket.id} voted for song ${data.songId}`);

        const song = playlist.find((song) => { return song.id === data.songId });

        // Check if song in already in queue

        if (song && !songQueue.some((song) => song.id === data.songId)) {
            songQueue.push({ ...song, votes: 1 });
        }
        else {
            songQueue = addVote(data.songId);
        }

        const cooldownDuration = 2 * 60 * 1000;
        userCooldowns[data.userId] = now + cooldownDuration;
        console.log(songQueue);
        io.emit('updatedQueue', { queue: songQueue });
        socket.emit('cooldownState', { canVote: false, timeOut: userCooldowns[data.userId] });
        console.log(userCooldowns);

        setTimeout(() => {
            delete userCooldowns[data.userId];
            console.log(`Cooldown expired for user: ${data.userId}`);
            socket.emit('cooldownState', { canVote: true });
        }, cooldownDuration);
    })

    socket.on('checkCooldown', (data) => {
        const now = Date.now();

        if (userCooldowns[data.userId] && userCooldowns[data.userId] > now) {
            socket.emit('cooldownState', { canVote: false, timeOut: userCooldowns[data.userId] });
        } else {
            socket.emit('cooldownState', { canVote: true });
        }
    });

    socket.on('getQueue', () => {
        socket.emit('updatedQueue', { queue: songQueue });
    })


})

function playNextSong() {
    if (songQueue.length > 0) {
        currentSong = songQueue.shift();
        currentSong.startTime = Date.now();

        io.emit('playSong', {
            songId: currentSong.id,
            startTime: 0
        });

        io.emit('updatedQueue', { queue: songQueue });

        setTimeout(playNextSong, currentSong.duration);
    } else {
        currentSong = songs[0];
        currentSong.startTime = Date.now();
        const startTime = 0;
        io.emit('playSong', {
            songId: currentSong.id,
            startTime: startTime
        })
        setTimeout(playNextSong, currentSong.duration);
    }
}

function addVote(songId) {
    // add vote
    const updatedQueue = songQueue.map((song) => {
        if (song.id === songId) {
            return { ...song, votes: song.votes + 1 }
        }
        else {
            return song
        }
    });
    return sortQueue(updatedQueue);
}

function sortQueue(queue) {
    return queue.sort((a, b) => b.votes - a.votes);
}

server.listen(8080, () => {
    console.log("Server running on port 8080.")
})
