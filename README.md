# Expense Tracker App (React Native + Expo + Firebase)

A complete mobile application to track your daily expenses with real-time sync, category filtering, and visual summaries.

## Features
- **Authentication**: Sign up and Login with Firebase.
- **Real-time Data**: Sync expenses across devices using Cloud Firestore.
- **Expense Management**: Add, View, and Delete expenses.
- **Filtering**: Categorize and filter expenses (Food, Travel, etc.).
- **Visuals**: Simple pie chart for expense breakdown.
- **Persistent Session**: Stay logged in using AsyncStorage.
- **Modern UI**: Clean design with animations and Lucide icons.

## Prerequisites
- Node.js installed.
- Expo Go app on your phone (for testing) or an Android/iOS emulator.

## Setup Instructions

1. **Clone or Download the Project**:
   Ensure you have all the files in your project directory.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Click "Add Project" and follow the steps.
   - Once the project is created, click the **Web icon (</>)** to add an app.
   - Copy the `firebaseConfig` object.
   - Open `src/services/firebase.js` and replace the placeholders with your actual config:
     ```javascript
     const firebaseConfig = {
       apiKey: "...",
       authDomain: "...",
       projectId: "...",
       storageBucket: "...",
       messagingSenderId: "...",
       appId: "..."
     };
     ```
   - In the Firebase Console, go to **Authentication** > **Sign-in method** and enable **Email/Password**.
   - Go to **Firestore Database** and click **Create database**. Start in **test mode** (or set appropriate rules).

4. **Run the App**:
   ```bash
   npx expo start
   ```
   - Scan the QR code with your Expo Go app (Android) or Camera app (iOS).
   - Or press `a` for Android Emulator or `i` for iOS Simulator.

## Project Structure
- `src/components`: Reusable UI components like `ExpenseItem`, `SummaryChart`.
- `src/screens`: App screens (Login, Signup, Dashboard, AddExpense).
- `src/context`: Auth and Expense State management using Context API.
- `src/services`: Firebase configuration and other services.
- `src/navigation`: App navigation logic.

## Learning Highlights
- **Context API**: Global state management for user and data.
- **React Navigation**: Handling complex screen transitions.
- **Firebase Firestore**: Real-time database integration.
- **Animations**: Using React Native `Animated` API for smooth transitions.
- **Axios**: Example of making external API calls in `DashboardScreen.js`.
