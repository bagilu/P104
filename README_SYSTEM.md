
# P104 WhisperTour v1.1

## 更新內容
- 統一使用 TOKEN_FUNCTION_URL
- 支援4位數房間碼
- 修正 GitHub Pages config 流程

## GitHub Pages

請建立：

config.js

內容：

window.P104_CONFIG = {
  LIVEKIT_URL: "wss://YOUR.livekit.cloud",
  TOKEN_FUNCTION_URL:
    "https://YOUR.supabase.co/functions/v1/P104_livekit_token"
};

## Supabase

Function Name:
P104_livekit_token

Verify JWT:
OFF

## Edge Function Secrets

LIVEKIT_API_KEY
LIVEKIT_API_SECRET
