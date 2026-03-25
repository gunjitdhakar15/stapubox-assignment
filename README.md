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
│   ├── Dropdown.js         # Dropdown selector
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

### Release Build Notes
- This project uses exact React Native-adjacent dependency versions to stay compatible with `react-native@0.76.9`.
- Android release builds are configured with `newArchEnabled=false` for a stable assessment build path.

---

## ⚙️ Configuration

### Assessment Credentials
The assessment API token is already configured in `src/api/client.js`:
```js
const API_TOKEN = 'trial_51869851_c04cf7af301eae1c3b702156189558fe';
```

Assessment entity reference:
```text
gunjit15@gmail.com
```

Note: the app sends `X-Api-Token`, `Authorization`, and `entity` headers for the assessment APIs.

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

5. **Dark Theme**: Uses a dark UI with blue primary actions and compact form screens aligned to the provided assessment design.

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

---

## 📝 Submission Checklist

- Push the codebase to a GitHub repository with this README.
- Attach the release APK from `android/app/build/outputs/apk/release/app-release.apk`.
- Record a demo video covering:
  - Send OTP -> Verify OTP
  - New user flow through Basic Info -> Sports Info -> Feedback -> Summary
  - Back/Next navigation persistence
  - Logout
  - Re-login / reinstall scenario showing saved profile data loading into Summary

### Suggested Demo Script
1. Open the app and send OTP with a valid phone number.
2. Verify OTP and show either Summary or the empty-state form flow.
3. Fill all required fields, submit once on Feedback, and land on Summary.
4. Tap Edit, go back and forth across screens, and show the form values persist.
5. Logout, log back in, and show previously saved data returned from `GET /trial/player`.
