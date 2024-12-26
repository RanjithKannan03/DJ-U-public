# DJ-U: Collaborative Music Experience  

**DJ-U** is a dynamic and interactive music player platform where users can come together to vote for the next song in the queue and enjoy a shared music experience. With features like real-time voting, room-based listening, and playback synchronization, DJ-U transforms how people enjoy music together.  

---

## Features  

- 🎶 **Vote-Based Song Playback**: Users can vote for their favorite songs, and the one with the most votes gets played next.  
- 🎵 **Room-Based Listening**: Join a room to sync your listening experience with others in real time.  
- ⏳ **Vote Restrictions**: Prevent users from voting for a song until it has finished playing to ensure fairness.  
- 📱 **Responsive Design**: Seamlessly works across desktop and mobile devices.  
- 🔒 **Secure Access**: Rooms are protected, and only authorized users can participate.  

---

## Technologies Used  

### Frontend  
- **Next.js**: For a fast, server-rendered React experience.  
- **Zustand**: For state management to handle real-time features like voting and playback.  

### Backend  
- **Node.js**: For handling API requests and managing rooms and votes.  
- **WebSockets**: To enable real-time synchronization across users in the same room.  
- **MongoDB**: To store user and song data.  

### Hosting  
- Hosted on **Render** for both frontend and backend services.  

---

## Prerequisites  

Before you begin, make sure you have:  
- Node.js (16 or higher) installed  
- MongoDB instance set up (local or cloud)  
- Environment variables configured for your app  

---
