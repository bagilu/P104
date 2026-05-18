# P104 WhisperTour v1.3

新增功能：
- QRCode：導遊端加入房間後產生遊客加入用 QRCode。
- 收聽人數：導遊端顯示目前遠端參與者人數。
- 離開導覽按鈕。
- 導遊靜音按鈕。
- 掃 QRCode 後自動帶入房間碼並切換為遊客模式。

設定方式沿用 v1.2：
- GitHub Pages：建立 config.js，填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。
- Supabase Secrets：設定 LIVEKIT_API_KEY 與 LIVEKIT_API_SECRET。
- Edge Function 名稱：P104_livekit_token。
- Verify JWT：OFF。
