# Demo Runbook

## Goal
Use this script to record a clean demo video that covers every requirement from the StapuBox assessment.

## Video Length
- Target: 2 to 4 minutes

## Before You Record
- Keep the phone or emulator ready on the Phone Login screen.
- Keep OTP accessible so there is no delay during recording.
- Make sure internet is working.
- Keep the app responsive and avoid background notifications.
- Do one dry run first if possible.

## What The Video Must Prove
- OTP login flow works
- JWT-based authenticated flow works
- New user form flow works
- Validation works
- Redux persistence across navigation works
- Single final submit works
- Summary screen works
- Edit and Logout work
- Returning user or reinstall scenario works

## Recording Script

### Part 1. Intro
Say:

```text
This is my StapuBox React Native assessment app. It implements OTP login, a multi-screen profile flow, Redux-based form persistence, API integration, and a release APK build.
```

### Part 2. Phone Login
Action:
- Show the Phone Login screen.
- Enter an invalid number first if you want to demonstrate validation.
- Then enter a valid 10-digit phone number.
- Tap `Send OTP`.

Say:

```text
The phone screen validates input and sends OTP through the provided authentication API.
```

### Part 3. OTP Verification
Action:
- Enter the OTP.
- Tap `Verify OTP`.

Say:

```text
After OTP verification, the app receives a JWT and uses it for the profile APIs.
```

### Part 4. Launch Logic
If the account has no existing data, say:

```text
Since there is no saved player profile, the app routes to the form flow starting with Basic Info.
```

If the account already has data, say:

```text
Since the backend returned saved player data, the app routes directly to the Summary screen.
```

### Part 5. Basic Info
Action:
- Briefly show required field validation.
- Fill Name, Address Line 1, optional Address Line 2, and valid Pincode.
- Tap `Next`.

Say:

```text
This screen validates the required fields locally before allowing navigation.
```

### Part 6. Sports Info
Action:
- Show that Sport is required.
- Select Playing Status.
- Select Sport from the API-loaded dropdown.
- Tap `Next`.

Say:

```text
The sports list is fetched from the API on screen load, while Playing Status remains optional.
```

### Part 7. Feedback
Action:
- Enter feedback.
- Tap `Submit`.

Say:

```text
The app saves to the backend only on the final screen, sending the full payload once under the player_data key.
```

### Part 8. Summary
Action:
- Show all read-only fields on Summary.

Say:

```text
This is the read-only summary screen showing the complete saved profile.
```

### Part 9. Edit And Navigation Persistence
Action:
- Tap `Edit`.
- Go back and forward between screens.
- Show that previously entered values are still present.

Say:

```text
The form state is stored in Redux, so values persist across Back and Next navigation.
```

### Part 10. Logout
Action:
- Return to Summary.
- Tap `Logout`.

Say:

```text
Logout clears both authentication and local form state, then returns the user to the login screen.
```

### Part 11. Returning User Or Reinstall Scenario
Action:
- Log in again using the same phone number after data has already been saved.
- Show that Summary loads directly from `GET /trial/player`.

Say:

```text
This demonstrates the returning-user scenario. After login, the app fetches the saved profile and routes directly to Summary.
```

## Recommended Recording Order
1. New user flow from login to summary
2. Edit and persistence
3. Logout
4. Returning user flow

## Final Closing Line
Say:

```text
This completes the StapuBox assessment flow including OTP authentication, form validation, API integration, Redux persistence, summary view, and returning-user behavior.
```

## Files To Submit Alongside The Video
- GitHub repository
- Release APK: `E:\Stapubox-assessment\android\app\build\outputs\apk\release\app-release.apk`
- README
- This demo runbook
