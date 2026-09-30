# P104 V0.001 Deployment Checklist

- [ ] Preserve the currently working production `config.js`.
- [ ] Upload/replace `index.html`, `style.css`, and `app.js` together.
- [ ] Confirm page visibly shows `P104 Web Version V0.001`.
- [ ] Confirm browser requests `style.css?v=0.001` and `app.js?v=0.001`.
- [ ] Confirm guide can create QR Code and microphone starts.
- [ ] Confirm microphone-denied path shows retry control.
- [ ] Confirm visitor QR scan auto-joins without pressing Join.
- [ ] Confirm visitor sees/re-shares the QR Code.
- [ ] Confirm guide listener count updates.
- [ ] Confirm guide mute and leave controls work.
- [ ] Confirm no LiveKit API secret is present in frontend files.
