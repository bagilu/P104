# P104 WhisperTour v1.2

## 版本重點

- 恢復較完整的 WhisperTour 介面風格。
- 統一使用 `TOKEN_FUNCTION_URL`。
- 房間碼固定為 4 位數字。
- Supabase Edge Function 不再使用 `livekit-server-sdk`，改為 Edge Function 內建 WebCrypto 產生 LiveKit JWT，減少 Deno npm bundling 問題。
- 前端會顯示更清楚的 token 錯誤細節。

## GitHub Pages 設定

請將 `config.example.js` 複製為 `config.js`，並修改：

```js
window.P104_CONFIG = {
  LIVEKIT_URL: "wss://your-livekit-project.livekit.cloud",
  TOKEN_FUNCTION_URL:
    "https://your-supabase-project.supabase.co/functions/v1/P104_livekit_token"
};
```

注意：GitHub Pages 只放 `LIVEKIT_URL` 與 `TOKEN_FUNCTION_URL`，不要放 LiveKit API key 或 API secret。

## Supabase Edge Function

Function 名稱：

```text
P104_livekit_token
```

請將：

```text
supabase-functions/P104_livekit_token/index.ts
```

貼到 Supabase Dashboard 的 Edge Function。

## Edge Function Settings

請設定：

```text
Verify JWT = OFF
```

## Edge Function Secrets

請在 Supabase Edge Function Secrets 設定：

```text
LIVEKIT_API_KEY
LIVEKIT_API_SECRET
```

不要加引號。

## 測試 Edge Function

打開：

```text
https://your-supabase-project.supabase.co/functions/v1/P104_livekit_token
```

若成功，應該會看到類似：

```json
{
  "ok": true,
  "service": "P104_livekit_token",
  "hasLiveKitApiKey": true,
  "hasLiveKitApiSecret": true
}
```

如果 key 或 secret 是 false，表示 Secrets 沒設定成功或沒有重新 Deploy。
