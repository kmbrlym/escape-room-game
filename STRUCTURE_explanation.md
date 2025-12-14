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
├── frontend/                                    ← What the user sees in browser
│   ├── index.html                              ← Home page with challenge list
│   ├── challenge1.html                         ← Challenge 1 page (word assembly)
│   ├── challenge2.html                         ← Challenge 2 page (card matching)
│   ├── challenge3.html                         ← Challenge 3 page (placeholder)
│   ├── final-escape.html                        ← Final escape page (placeholder)
│   ├── css/
│   │   └── styles.css                          ← Styling (colors, layout, animations)
│   └── js/
│       ├── navigation.js                       ← Game state management & page navigation
│       ├── intro.js                            ← Intro splash screen with typewriter effect
│       ├── challenge1.js                        ← Challenge 1 game logic (drag & drop)
│       ├── challenge2.js                        ← Challenge 2 game logic (card matching)
│       └── api-client.js                        ← Sends HTTP requests to backend
│
└── backend/                                      ← The server that validates answers
    ├── pom.xml                                  ← Maven dependencies (libraries needed)
    └── src/main/
        ├── resources/
        │   └── application.properties            ← Server configuration (port 8080)
        └── java/gamer/
            ├── GameServer.java                  ← Main entry point (starts the server)
            ├── controllers/
            │   ├── Challenge1Controller.java    ← Receives Challenge 1 HTTP requests
            │   └── Challenge2Controller.java    ← Receives Challenge 2 HTTP requests
            ├── services/
            │   └── ValidationService.java       ← Validates answers for all challenges
            └── models/                           ← Data structures
                ├── Challenge1Request.java      ← Challenge 1 request format
                ├── Challenge2Request.java        ← Challenge 2 request format
                ├── ChallengeResponse.java        ← Response format (success/error + game state)
                └── GameState.java                ← Tracks game progress (letters & challenges)
```