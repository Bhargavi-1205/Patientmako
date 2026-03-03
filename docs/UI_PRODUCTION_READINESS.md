# Patient App Expo - UI and Performance Production Readiness

Date: 2026-03-02  
Project: `Patient_App_Expo`

## Goal

Upgrade the Expo app to production-level quality with:

1. Flutter-parity UI and user flow.
2. Stable, fast rendering on low-mid Android devices.
3. Predictable data flow with fewer regressions.

## Current Baseline (Already Improved)

1. OTP success flow now checks server location and opens map only when location is missing.
2. Selected location is posted to `/patients/:patientId/location`.
3. PDF viewer flow is aligned with the working implementation pattern:
   - file-key candidate resolution
   - decrypt fallback path
   - local file fallback for renderer
4. Home `Things To Do` section updated with Flutter-like horizontal cards.
5. Home clinics section updated to `Select Doctor By Clinic` with `See all` -> dedicated clinic list flow.
6. Hardcoded rating badge removed from clinic doctor listing.
7. Doctor mapping improved for payload variants (`first_name`, `last_name`, etc.) to avoid blank names.

## Current Problems and Risks

### P0 (Must fix before production)

1. PDF open failures still possible for some files:
   - symptom: `File not in PDF format or corrupted`
   - likely cause: backend may return encrypted/binary payload in non-renderable format for direct viewer path
   - impact: prescriptions cannot be viewed for affected patients
2. Data-state collision risk in doctor flows:
   - shared slice data can be overwritten when switching between global doctors and clinic doctors
   - impact: wrong list shown or stale names

### P1 (Fix in current release cycle)

1. Flutter parity is still incomplete across Drawer, Doctor details, Appointment booking, and Profile screens.
2. List performance tuning is inconsistent (`FlatList` props, row memoization, stable keys).
3. Repeated network calls can still happen on quick tab/screen re-entry for some modules.

### P2 (Fix before scale-up)

1. Too many runtime logs in critical flows; possible performance hit and sensitive-data leakage risk.
2. Navigation param typing is partial; runtime payload mismatch can crash screens.
3. Visual system is not fully standardized (spacing, typography, status chips, card rhythm).

## Next-Level UI Plan

### Stage 1: Flutter Parity Lock

1. Freeze reference screenshots from Flutter for:
   - Home
   - Drawer
   - Clinic list
   - Clinic doctors
   - Appointment booking
   - Prescription details/PDF entry
2. Build a parity checklist per screen:
   - spacing
   - typography
   - icon sizes
   - card shapes
   - states (loading/empty/error)
3. Resolve all hardcoded placeholder values in UI labels and badges.

### Stage 2: Design System Hardening

1. Create a single token set:
   - colors
   - spacing scale
   - radii
   - typography roles
2. Refactor repeated UI into shared primitives:
   - section header
   - list card shell
   - status badge
   - skeleton loader
3. Enforce consistent touch targets and accessibility labels.

### Stage 3: Production UX States

1. Add skeletons for all list/detail entry points.
2. Add empty/error/offline states with retry actions.
3. Ensure all critical actions have loading + disable states.

## Performance Plan

### Data and Fetching

1. Add TTL-based caching per feature module (clinics, doctors, appointments, prescriptions).
2. Prevent duplicate in-flight API calls on rapid navigation.
3. Split doctor store into isolated domains:
   - `allDoctors`
   - `clinicDoctorsByClinicId`

### Rendering

1. Optimize all long lists:
   - stable `keyExtractor`
   - `initialNumToRender`
   - `windowSize`
   - `maxToRenderPerBatch`
2. Memoize row components and expensive selectors.
3. Replace heavy image rendering with cached image pipeline (`expo-image`).

### PDF and Media Reliability

1. Validate downloaded/decrypted bytes before render (PDF signature check `%PDF`).
2. Add a deterministic fallback:
   - if local render fails, open remote with auth headers if supported
   - else show recoverable error with retry/report button
3. Ensure temp files are cleaned on unmount and on next entry.

## Code Health and Stability Plan

1. Move all debug logs under `__DEV__` and mask sensitive fields.
2. Complete route typing for stack/tab/navigation params.
3. Add integration tests for:
   - OTP -> location check branch
   - clinic select -> doctor list
   - prescription open happy path + failure path
4. Add runtime monitoring:
   - crash reporting
   - API failure rate
   - screen render time

## Production Definition of Done

1. Flutter parity approved for target screens with screenshot comparison.
2. No blank doctor names or clinic titles in QA data.
3. No hardcoded ratings/counters unless backed by API value.
4. Screen transition and scroll performance stays smooth on low-mid Android devices.
5. Prescription PDF success rate meets release threshold in QA.
6. Crash-free sign-in -> clinic -> booking -> prescription flow in repeated runs.

## Priority Sprint Breakdown

### Sprint 1

1. Fix P0 PDF reliability.
2. Split doctor state domains.
3. Complete parity for Home + Clinics + Drawer.

### Sprint 2

1. Complete parity for Appointment + Profile + Doctor details.
2. List and image performance tuning.
3. Full empty/error/offline states.

### Sprint 3

1. Navigation typing completion.
2. Observability + release smoke automation.
3. Final regression and release candidate validation.
