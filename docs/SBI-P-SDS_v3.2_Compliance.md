# P104 V0.001 — SBI-P-SDS v3.2 Compliance Note

## Scope
This is a structural/compliance re-baseline of the tested P104 WhisperTour v1.6. No intentional user-facing product feature is added.

## Applied requirements
1. GitHub Pages remains static HTML/CSS/JavaScript; no Node/npm/build pipeline is introduced.
2. Deployment configuration remains in `config.js`, but the deliverable template is `config-sample.js`.
3. Repository contains `README.md`, frontend files, `database/`, and `docs/`.
4. User-visible Web Version is V0.001.
5. CSS and JavaScript cache-busting query strings are synchronized to `0.001`.
6. Edge Function name contains the project code: `P104_livekit_token`.
7. LiveKit secrets remain server-side in Supabase Edge Function secrets.
8. No authentication is added to the public tour flow.
9. No cross-project SQL, global grants, or other P-series object modifications are included.
10. `90_P104_Permissions.sql` and `99_P104_HealthCheck.sql` are included for baseline completeness.

## Deliberately unchanged
- Guide/visitor UX and current audio behavior.
- Four-digit internal room code.
- QR-based auto-join.
- Visitor QR re-sharing.
- Guide microphone retry/mute/leave controls.
- Listener count.
- LiveKit/Supabase token architecture.
