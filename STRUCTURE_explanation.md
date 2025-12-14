# Simple Structure Explanation

## 🎯 The Big Picture

```
┌─────────────────┐         HTTP Request          ┌─────────────────┐
│                 │  ──────────────────────────>  │                 │
│   FRONTEND      │                                │    BACKEND      │
│  (HTML/CSS/JS)  │  <──────────────────────────  │     (Java)      │
│                 │      HTTP Response             │                 │
└─────────────────┘                                └─────────────────┘
   Browser                                              Server
   Port 8000                                           Port 8080
```

## 📁 Complete Folder Structure

```
escape-room-game/
├── frontend/                          ← What the user sees in browser
│   ├── index.html                     ← The webpage (HTML structure)
│   ├── css/
│   │   └── styles.css                ← Styling (colors, layout)
│   └── js/
│       ├── navigation.js              ← Page switching logic
│       ├── challenge1.js              ← Challenge 1 game logic
│       └── api-client.js              ← Sends HTTP requests to backend
│
└── backend/                            ← The server that validates answers
    ├── pom.xml                        ← Maven dependencies (libraries needed)
    └── src/main/
        ├── resources/
        │   └── application.properties ← Server configuration (port 8080)
        └── java/gamer/
            ├── GameServer.java        ← Main entry point (starts the server)
            ├── controllers/
            │   └── Challenge1Controller.java  ← Receives HTTP requests
            ├── services/
            │   └── ValidationService.java      ← Validates answers
            └── models/                         ← Data structures
                ├── Challenge1Request.java     ← What frontend sends
                ├── ChallengeResponse.java      ← What backend sends back
                └── GameState.java              ← Tracks game progress
```