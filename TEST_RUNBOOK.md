# Test Runbook

## Goal
Use this runbook to verify the StapuBox assessment flow end to end before submission.

## Environment
- Project root: `E:\Stapubox-assessment`
- React Native version: `0.76.9`
- Assessment API token is already configured in `src/api/client.js`
- Assessment entity reference: `gunjit15@gmail.com`

## One-Time Setup
```bash
cd E:\Stapubox-assessment
npm install
```

## Start The App
Open terminal 1:

```bash
cd E:\Stapubox-assessment
npx react-native start
```

Open terminal 2:

```bash
cd E:\Stapubox-assessment
npx react-native run-android
```

## Quick Sanity Checks
Run:

```bash
cd E:\Stapubox-assessment
npm run lint
```

Expected result:
- Lint passes without errors.

## Full Functional Test

### 1. Phone Login
Expected:
- Phone input accepts digits only.
- Empty phone shows validation error.
- Invalid phone shows validation error.
- Valid 10-digit phone enables `Send OTP`.

Action:
- Enter a valid 10-digit phone number.
- Tap `Send OTP`.

Expected:
- Loading state appears.
- App navigates to OTP screen.

### 2. OTP Verify
Expected:
- OTP accepts 4 digits.
- Incomplete OTP should not verify.
- Wrong OTP should show error feedback.
- Correct OTP should return a JWT and continue.

Action:
- Enter the correct OTP.
- Tap `Verify OTP`.

Expected:
- Loading state appears.
- App calls `GET /trial/player`.
- If data exists, app opens Summary.
- If no data exists, app opens Basic Info.

### 3. New User Flow
Use this when `GET /trial/player` returns no profile.

#### Basic Info
Action:
- Leave required fields empty and tap `Next`.

Expected:
- Errors appear for Name, Address Line 1, and Pin Code.

Action:
- Fill Name.
- Fill Address Line 1.
- Optionally fill Address Line 2.
- Fill a valid 6-digit pin code.
- Tap `Next`.

Expected:
- App moves to Sports Info.

#### Sports Info
Action:
- Tap `Next` without selecting a sport.

Expected:
- Sport validation error appears.

Action:
- Optionally select Playing Status.
- Select a sport from the API-loaded dropdown.
- Tap `Next`.

Expected:
- App moves to Feedback.

#### Feedback
Action:
- Enter optional feedback.
- Tap `Submit`.

Expected:
- Only one final `POST /trial/player` is made here.
- Payload is wrapped under `player_data`.
- App opens Summary on success.

### 4. Summary Screen
Expected:
- Name, address, pincode, playing status, sport, and feedback are shown read-only.
- `Edit` is available.
- `Logout` is available.

Action:
- Tap `Edit`.

Expected:
- App returns to Basic Info with previously entered values still present.

### 5. Navigation Persistence
Action:
- From Basic Info, enter values and tap `Next`.
- On Sports Info, choose values.
- Tap back.

Expected:
- Earlier values remain intact.

Action:
- Move forward again to Feedback.
- Enter feedback.
- Tap back and return again.

Expected:
- Feedback is still present.

### 6. Logout Flow
Action:
- From Summary, tap `Logout`.

Expected:
- Auth state clears.
- Form state clears.
- App returns to Phone Login.

### 7. Reinstall / Returning User Scenario
Action:
- Use the app after data has already been saved.
- Reopen the app or reinstall it.
- Login again with OTP.

Expected:
- `GET /trial/player` returns saved data.
- App navigates directly to Summary.
- Saved values are displayed correctly.

## API Behavior Checklist
- `POST /trial/sendOtp` works from Phone Login.
- `POST /trial/verifyOtp` returns JWT.
- JWT is attached as `Authorization: Bearer <token>`.
- `X-Api-Token` is attached on requests.
- `GET /sports/` loads sports list.
- `GET /trial/player` controls launch routing after OTP.
- `POST /trial/player` happens only on Feedback submit.

## Release Build Verification
Build the APK:

```bash
cd E:\Stapubox-assessment\android
gradlew.bat assembleRelease
```

Expected artifact:
- `E:\Stapubox-assessment\android\app\build\outputs\apk\release\app-release.apk`

## Final Submission Checklist
- App launches successfully on Android.
- Full OTP -> form -> summary flow works.
- Existing-user launch logic works.
- Back/Next persistence works.
- Logout works.
- APK is generated.
- README is present.
- Demo video is recorded.
