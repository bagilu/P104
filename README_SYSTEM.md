# P104 WhisperTour v1.4

修正 QRCode：改用 QR Server 圖片 API，不再依賴 QRCode JavaScript 套件。
新增標題：慈濟大學經營管理學系學生專題，其中「經營管理學系」使用醒目色。
延續 v1.3：QRCode、收聽人數、離開導覽、導遊靜音、4 位數房間碼。

GitHub Pages：複製 config.example.js 為 config.js，填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。
Supabase Edge Function：P104_livekit_token；Verify JWT：OFF。
Secrets：LIVEKIT_API_KEY、LIVEKIT_API_SECRET。
