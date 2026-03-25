# StapuBox Assignment

React Native mobile application for the StapuBox frontend assessment.

The app implements:
- OTP-based authentication
- Multi-step profile form
- Redux-based form persistence across navigation
- Profile save and fetch integration with the provided APIs
- Summary view with edit and logout actions

## Tech Stack

- React Native 0.76
- Redux Toolkit
- React Navigation
- Axios
- Android Gradle build

## Project Structure

```text
src/
  api/
    auth.js
    client.js
    player.js
  components/
    Button.js
    Dropdown.js
    Input.js
    LoadingOverlay.js
    ScreenWrapper.js
  navigation/
    AppNavigator.js
  screens/
    PhoneLoginScreen.js
    OtpVerifyScreen.js
    BasicInfoScreen.js
    SportsInfoScreen.js
    FeedbackScreen.js
    SummaryScreen.js
  store/
    authSlice.js
    formSlice.js
    index.js
  theme/
    index.js
  utils/
    validation.js
  App.js
```

## Implemented Flow

1. User enters mobile number and requests OTP
2. User verifies OTP and receives authenticated access
3. App checks for an existing saved profile
4. If profile exists, app routes to Summary
5. If profile does not exist, app starts the profile form flow
6. User completes:
   - Basic Info
   - Sports Info
   - Feedback
7. App submits the full `player_data` payload in a single save request
8. Summary screen shows saved information with Edit and Logout actions

## API Integration

Configured endpoints:

- `POST /trial/sendOtp`
- `POST /trial/verifyOtp`
- `GET /sports/`
- `GET /trial/player`
- `POST /trial/player`

Headers used by the app:

- `X-Api-Token`
- `Authorization: Bearer <jwt>`
- `entity`
- `Content-Type: application/json`

Assessment credentials are configured in [src/api/client.js](E:\Stapubox-assessment\src\api\client.js).

## Validation

The app validates:

- Name: required
- Address Line 1: required
- Pin Code: required, 6 digits
- Sport: required
- Address Line 2: optional
- Playing Status: optional
- Feedback: optional

## Setup

Requirements:

- Node.js 18+
- JDK 17
- Android SDK / Android Studio
- React Native CLI environment

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npx react-native start
```

Run on Android:

```bash
npx react-native run-android
```

## Release Build

Build release APK:

```bash
cd android
./gradlew assembleRelease
```

Generated APK:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## Notes

- Form state is stored in Redux and preserved across Back/Next navigation.
- Form data is cleared on logout.
- Existing profile handling is based on `GET /trial/player`.
- The app is built with React Native CLI, not Expo.
