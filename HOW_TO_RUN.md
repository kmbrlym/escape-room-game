# How to Run the Escape Room Game

## Quick Start

### Step 1: Start the Backend (Java Server)

Open Terminal 1:
```bash
cd backend
mvn spring-boot:run
```

**Wait for this message:**
```
Started GameServer in X.XXX seconds
```

The backend is now running on: `http://localhost:8080`

### Step 2: Start the Frontend (Web Server)

Open Terminal 2 (new terminal window):
```bash
cd frontend
python3 -m http.server 8000
```

**You should see:**
```
Serving HTTP on 0.0.0.0 port 8000
```

The frontend is now running on: `http://localhost:8000`

### Step 3: Open in Browser

Open your web browser and go to:
```
http://localhost:8000
```

## What You'll See

1. **Home Page**: Game instructions and challenge buttons
2. **Click "Start Challenge 1"**: Opens the word assembly challenge
3. **Arrange letters**: Drag letters to spell "DAVIS MAIN FLOOR"
4. **Click "Check Answer"**: Validates with backend
5. **Success!**: Get letter U and unlock Challenge 2

## Troubleshooting

### Backend won't start?
- Make sure port 8080 is not in use
- Check if Java is installed: `java -version`
- Check if Maven is installed: `mvn --version`

### Frontend won't start?
- Make sure port 8000 is not in use
- Try a different port: `python3 -m http.server 8001`
- Then open: `http://localhost:8001`

### Can't connect to backend?
- Make sure backend is running (check Terminal 1)
- Make sure you're using `http://localhost:8000` (not `file://`)
- Check browser console (F12) for errors

## Stopping the Servers

- **Backend**: Press `Ctrl+C` in Terminal 1
- **Frontend**: Press `Ctrl+C` in Terminal 2

