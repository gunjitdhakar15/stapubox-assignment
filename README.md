# StapuboxProfile — React Native Profile Form App

A React Native (CLI) mobile app implementing a **Phone OTP Login → 4-Screen Profile Form → Summary** flow with **Redux state management** and **API integration**.

---

## 📱 Screenshots Flow

| Screen | Description |
|--------|-------------|
| **Phone Login** | Enter phone number, send OTP |
| **OTP Verify** | Enter 4-digit OTP, receive JWT |
| **Basic Info** | Name, Address Line 1/2, Pin Code |
| **Sports Info** | Playing Status dropdown + Sport dropdown (API-fetched) |
| **Feedback** | Multi-line feedback text area |
| **Summary** | Read-only profile display with Edit/Logout |

---

## 🏗️ Architecture

### Tech Stack
- **React Native 0.76** (CLI, not Expo)
- **Redux Toolkit** — global state management
- **React Navigation v7** — stack-based navigation
- **Axios** — HTTP client with interceptors

### Project Structure
```
src/
├── api/                    # API service layer
│   ├── client.js           # Axios instance + interceptors
│   ├── auth.js             # sendOtp, verifyOtp
│   └── player.js           # getSports, getPlayer, savePlayer
├── store/
│   ├── index.js            # configureStore
│   ├── authSlice.js        # Auth state (phone, token)
│   └── formSlice.js        # Form state (all profile fields)
├── screens/
│   ├── PhoneLoginScreen.js
│   ├── OtpVerifyScreen.js
│   ├── BasicInfoScreen.js
│   ├── SportsInfoScreen.js
│   ├── FeedbackScreen.js
│   └── SummaryScreen.js
├── components/
│   ├── Input.js            # Animated text input
│   ├── Button.js           # Primary/secondary/text button
│   ├── Dropdown.js         # Bottom-sheet modal picker
│   ├── ScreenWrapper.js    # SafeArea + header + keyboard
│   └── LoadingOverlay.js   # Full-screen loading
├── navigation/
│   └── AppNavigator.js     # Stack navigator
├── utils/
│   └── validation.js       # Phone, pincode, form validators
├── theme/
│   └── index.js            # Design tokens (colors, typography, spacing)
└── App.js                  # Root component
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js ≥ 18
- JDK 17
- Android Studio with SDK 34
- React Native CLI

### Install & Run
```bash
# Clone the repo
git clone <repo-url>
cd Stapubox-assessment

# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android (new terminal)
npx react-native run-android
```

### Build APK
```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## ⚙️ Configuration

### API Token
Edit `src/api/client.js` and replace the `API_TOKEN` value:
```js
const API_TOKEN = 'YOUR_API_TOKEN_HERE';
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/trial/sendOtp` | Send OTP to phone |
| POST | `/trial/verifyOtp` | Verify OTP, receive JWT |
| GET | `/sports/` | Fetch sports list |
| GET | `/trial/player` | Get existing profile |
| POST | `/trial/player` | Save profile (under `player_data` key) |

---

## 🔑 Key Design Decisions

1. **Single POST on Submit**: Form data is stored in Redux across screens, and only a single `POST /trial/player` call is made on Screen 3 (Feedback Submit) with the complete `player_data` payload.

2. **Launch Logic**: After OTP verification, the app calls `GET /trial/player`. If data exists → navigate to Summary. If 404 → start at Basic Info.

3. **Reinstall Scenario**: User authenticates again via OTP → GET returns previously saved data → navigates to Summary.

4. **Navigation Persistence**: Redux stores all form fields, so pressing Back retains entered data. Cleared only on Logout.

5. **Dark Theme**: Matches Figma design with `#121212` background, `#008DFF` primary buttons, white text, and grey labels.

6. **Animated Interactions**: Input focus border animation, button press scale effect, OTP input shake on error.

---

## ✅ Validation Rules

| Field | Rule |
|-------|------|
| Name | Non-empty (required) |
| Address Line 1 | Non-empty (required) |
| Address Line 2 | Optional |
| Pin Code | 6 digits (required) |
| Sport | Must be selected (required) |
| Playing Status | Optional |
| Feedback | Optional |

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `@reduxjs/toolkit` | State management |
| `react-redux` | React bindings for Redux |
| `@react-navigation/native` | Navigation framework |
| `@react-navigation/stack` | Stack-based navigation |
| `react-native-screens` | Native navigation optimization |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-gesture-handler` | Gesture support |
| `react-native-reanimated` | Smooth animations |
| `axios` | HTTP requests |
