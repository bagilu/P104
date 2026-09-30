# P104 WhisperTour — Web Version V0.001

**SBI-P-SDS v3.2 compliant baseline**

This repository reorganizes the previously tested P104 WhisperTour v1.6 as the formal V0.001 baseline. No product feature has been intentionally added.

## Preserved behavior
- Guide selects guide mode and presses **創建 QRCode**.
- A four-digit room code is generated internally and embedded in the QR Code.
- Visitors scan the QR Code and automatically enter/listen without another Join action.
- Visitors can display/share the same QR Code after joining.
- Guide microphone, mute, retry microphone permission, listener count, and leave-tour behavior are preserved.
- LiveKit Cloud remains the realtime audio layer; Supabase Edge Function remains the token issuer.

## SBI-P-SDS v3.2 alignment
- Visible Web Version: `P104 Web Version V0.001`.
- CSS/JS cache-busting parameters use `0.001`, synchronized with Web Version.
- Repository contains `config-sample.js`; do **not** overwrite the deployed `config.js`.
- P104 Edge Function remains project-scoped: `P104_livekit_token`.
- Includes `database/`, `docs/`, `90_P104_Permissions.sql`, and `99_P104_HealthCheck.sql` documentation for this no-database baseline.
- No shared Auth is added because the current public tour flow does not require login.

## Deployment
1. Keep the existing production `config.js` on GitHub Pages.
2. For a new deployment, copy `config-sample.js` to `config.js` and fill in the public LiveKit URL and Supabase token-function URL.
3. Keep LiveKit API key/secret only in Supabase Edge Function secrets.
4. Deploy `supabase-functions/P104_livekit_token/index.ts` only if the existing function needs to be restored.

## Stable baseline
- Project: P104 WhisperTour
- Web Version: V0.001
- Standard: SBI-P-SDS v3.2
- Functional source baseline: tested P104 WhisperTour v1.6
