# Dev Change Log

## 2026-03-24

### Audit Scope
- Re-read the assignment requirements for OTP auth, 4-step profile flow, Redux-backed form state, single final submit, and launch-time profile routing.
- Reviewed the current app logic in auth, player APIs, Redux slices, navigation, and all form screens without changing the UI layer.

### Findings
- `verifyOtp` had already been corrected to use `mobile`; `phone` is rejected by the backend.
- `verifyOtp` request formatting was partially fixed, but the app still needed more defensive handling around payload/response parsing.
- Existing-profile routing after login was off-spec: `getPlayer()` returns parsed API data, while the screen logic still expected an axios-style wrapper.
- Sports loading was fragile: the screen expected a nested response shape instead of a normalized list from the API layer.
- Save/load APIs were not consistently checking for `status: failed` responses returned with HTTP 200.

### Changes Made
- Normalized sports and player profile responses in `src/api/player.js`.
- Added safer player-data extraction to support both wrapped and direct backend payloads.
- Made save-player handling throw meaningful errors on logical API failures.
- Updated `src/screens/SportsInfoScreen.js` to consume a normalized sports array.
- Updated `src/screens/OtpVerifyScreen.js` to:
  - clear stale auth errors on mount,
  - read existing profile data through the normalized player API,
  - extract JWT from additional possible response shapes.
- Updated `src/api/auth.js` to submit verify data in both the request body and query params for better backend compatibility.

### Live Backend Notes
- `POST /trial/sendOtp` succeeds with `{ "mobile": "<10-digit-number>" }`.
- `POST /trial/verifyOtp` accepts `mobile` and rejects `phone`.
- The backend still returns `Invalid OTP or expired` even when the app-side request contract is now aligned, so final OTP verification still needs one clean end-to-end retest with the freshest OTP from the latest send/resend.

### Next Verification Pass
- Rebuild the app and retest send OTP -> verify OTP with the newest OTP only.
- Confirm post-login routing:
  - saved profile -> `Summary`
  - no saved profile -> `BasicInfo`
- Confirm final profile submit persists and returns on re-login.

## 2026-03-25

### UI Polish Pass
- Compared the shipped UI against the shared Figma screenshots and focused on the highest-visibility mismatches instead of doing a full redesign.

### Visual Changes Made
- Tightened global spacing, typography, input density, dropdown density, and button sizing to move closer to the compact Figma layout.
- Refined the shared header layout so titles sit smaller and the right-side logout action has enough space.
- Reworked the login screen spacing and alignment to better match the centered Figma composition.
- Restyled OTP inputs from underlined fields to smaller bordered boxes, closer to the Figma frames.
- Added a feedback character counter and aligned the feedback field styling more closely to the design.
- Simplified the summary screen from a card-heavy layout to a flatter stacked-detail layout, which is closer to the Figma summary screen.

### Files Updated In This Pass
- `src/theme/index.js`
- `src/components/ScreenWrapper.js`
- `src/components/Input.js`
- `src/components/Button.js`
- `src/components/Dropdown.js`
- `src/screens/PhoneLoginScreen.js`
- `src/screens/OtpVerifyScreen.js`
- `src/screens/FeedbackScreen.js`
- `src/screens/SummaryScreen.js`
