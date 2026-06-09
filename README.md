# TideWatch 🌊

TideWatch is a real-time fluid intelligence system designed for coastal monitoring. It leverages ultrasonic sensing and ThingsBoard Cloud to provide precise, live telemetry of water levels, helping users track tidal trends and sensor performance from field nodes.

## 🚀 Key Features

- **Live Data Monitor:** Real-time water level and sensor distance tracking.
- **Interactive Charts:** Historical comparison and trend analysis using Recharts.
- **Security First:** Integrated Firebase Authentication for user accounts and secure token handling.
- **Mobile Responsive:** Fully optimized UI for desktop and mobile devices.
- **Data Export:** Download telemetry data as CSV for offline analysis.
- **Push Notifications:** Built-in alerts for critical tidal events.

## 🛠️ Technology Stack

- **Frontend:** React 19 (Vite), TailwindCSS, Recharts.
- **Backend:** Firebase Cloud Functions (v2), Node.js.
- **Database:** Firebase Firestore.
- **IoT Core:** ThingsBoard Cloud (WebSocket).
- **Deployment:** Firebase Hosting.

## 📦 Project Structure

```text
tidewatch/
├── functions/             # Firebase Cloud Functions (Backend)
│   └── index.js           # ThingsBoard Token & Alarm Logic
├── src/
│   ├── components/        # UI Building Blocks
│   ├── context/           # Auth & ThingsBoard Global State
│   ├── layouts/           # Page Wrappers (Main, Dashboard, Simple)
│   └── pages/             # Application Views
├── public/                # Static Assets
└── vite.config.js         # Vite Configuration
```

## ⚙️ Getting Started

### 1. Prerequisites

- Node.js (v22+)
- Firebase CLI (`npm install -g firebase-tools`)
- A ThingsBoard Cloud account and Device ID.

### 2. Installation

Clone the repository and install dependencies:

```powershell
npm install
cd functions
npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_THINGSBOARD_HOST=thingsboard.cloud
VITE_FIREBASE_FUNCTION_URL=http://127.0.0.1:5001/your-project-id/functions-region/getThingsBoardToken
```

### 4. Local Secrets

For Cloud Functions to work locally, create `functions/.secret.local`:

```env
THINGSBOARD_USERNAME=your_username
THINGSBOARD_PASSWORD=your_password
THINGSBOARD_DEVICE_ID=your_device_id
```

### 5. Running Locally

Run both the frontend and the Firebase emulators:

```powershell
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend Emulators
firebase emulators:start
```

## 🚢 Deployment

1.  **Build the app:**
    ```powershell
    npm run build
    ```
2.  **Set Secrets in Google Cloud:**
    ```powershell
    firebase functions:secrets:set THINGSBOARD_USERNAME
    firebase functions:secrets:set THINGSBOARD_PASSWORD
    firebase functions:secrets:set THINGSBOARD_DEVICE_ID
    ```
3.  **Deploy to Firebase:**
    ```powershell
    firebase deploy
    ```

## 📜 License

This project is private and proprietary.
