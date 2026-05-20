# P104 WhisperTour v1.6

## 本版更新
1. 導遊按「創建 QRCode」後，系統自動產生 4 位數房間碼並放入 QRCode，不再要求導遊或遊客知道房間碼。
2. 遊客掃描 QRCode 後，自動進入遊客模式並自動加入導覽，不需要再按「加入」。
3. 增加「重新允許麥克風」按鈕。若導遊誤按不允許麥克風，可再次觸發麥克風權限請求。
4. 其他流程與視覺風格延續 v1.5.1。

## 注意
若瀏覽器已將麥克風設為永久封鎖，按「重新允許麥克風」仍可能失敗。此時需到瀏覽器網址列左側權限設定，手動允許麥克風。

## 設定
GitHub Pages：複製 config.example.js 為 config.js，填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。
Supabase Edge Function：P104_livekit_token；Verify JWT：OFF。
Secrets：LIVEKIT_API_KEY、LIVEKIT_API_SECRET。
