# WhisperTour｜P104 Smart Tour Audio System v1

本版本是 P104 WhisperTour 的最小可行版本：導遊建立導覽房間，遊客掃 QR Code 加入，導遊可開麥克風，遊客只收聽。

## 一、重要安全提醒

LiveKit API Secret 絕對不能放在 GitHub Pages、前端 JavaScript 或公開 Repository。

如果 API Secret 曾經貼到公開環境或對話中，請到 LiveKit 後台重新產生或刪除重建 API key。

本版本採用：

- GitHub Pages：前端介面
- Supabase Edge Function：產生 LiveKit access token
- LiveKit Cloud：WebRTC / SFU 即時音訊服務

## 二、檔案結構

```text
P104_WhisperTour_v1/
├─ index.html
├─ style.css
├─ app.js
├─ config.example.js
├─ README_SYSTEM.md
└─ supabase-functions/
   └─ P104_livekit_token/
      └─ index.ts
```

## 三、LiveKit 設定

需要準備三個值：

```text
LIVEKIT_URL
LIVEKIT_API_KEY
LIVEKIT_API_SECRET
```

其中：

- LIVEKIT_URL 可以放在前端 config.js
- LIVEKIT_API_KEY 與 LIVEKIT_API_SECRET 只能放在 Supabase Edge Function Secrets

## 四、建立 Supabase Edge Function

Function 名稱：

```text
P104_livekit_token
```

操作方式：

1. 進入 Supabase Dashboard
2. 左側選 Edge Functions
3. 建立新 Function：P104_livekit_token
4. 將 `supabase-functions/P104_livekit_token/index.ts` 全部貼入
5. 儲存 / Deploy

## 五、設定 Supabase Secrets

在 Supabase Edge Function 的 Secrets / Environment Variables 設定：

```text
LIVEKIT_API_KEY=你的 LiveKit API Key
LIVEKIT_API_SECRET=你的 LiveKit API Secret
```

不要把 API Secret 寫進 config.js。

## 六、設定前端 config.js

複製：

```text
config.example.js
```

另存為：

```text
config.js
```

內容範例：

```js
window.P104_CONFIG = {
  LIVEKIT_URL: "wss://YOUR-LIVEKIT-PROJECT.livekit.cloud",
  TOKEN_FUNCTION_URL: "https://YOUR-SUPABASE-PROJECT.supabase.co/functions/v1/P104_livekit_token"
};
```

## 七、部署到 GitHub Pages

將以下檔案放到 GitHub Repository：

```text
index.html
style.css
app.js
config.js
```

若 Repository 是公開的，請再次確認 config.js 裡沒有 API Secret。

## 八、測試方式

1. 電腦開啟 GitHub Pages 網頁
2. 輸入房間碼，例如 `whispertour-test`
3. 名稱輸入 `guide`
4. 按「我是導遊」
5. 允許麥克風
6. 用手機掃導遊端 QR Code
7. 手機以遊客身份加入
8. 手機戴耳機收聽

## 九、目前版本限制

- 沒有登入機制
- 沒有資料庫
- 沒有導覽紀錄
- 沒有正式導遊身份驗證
- 任何知道房間碼的人都可嘗試加入
- v1 目標是 PoC，不是正式商用版

## 十、後續 v2 建議

- 加入導遊密碼或管理員登入
- 房間建立權限限制
- 導覽場次紀錄
- 收聽人數統計
- 導覽結束按鈕同步讓遊客離場
- AI 即時字幕
- 多語翻譯
- 展品卡片同步顯示
