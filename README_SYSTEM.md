# P104 WhisperTour v1.5

## 本版更新
1. 導遊與遊客都不需要輸入暱稱，系統會自動產生臨時 identity。
2. 導遊產生 QRCode 後，遊客掃描加入後，遊客手機也會顯示同一個 QRCode，方便同行者快速散播加入。
3. 延續 v1.4：4 位數房間碼、收聽人數、導遊靜音、離開導覽、QR Server 圖片 API。

## 設定
GitHub Pages：複製 config.example.js 為 config.js，填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。
Supabase Edge Function：P104_livekit_token；Verify JWT：OFF。
Secrets：LIVEKIT_API_KEY、LIVEKIT_API_SECRET。
