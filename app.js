let currentRole = "guide";
let livekitRoom = null;

const statusEl = document.getElementById("status");
const debugEl = document.getElementById("debug");

function setStatus(text, type="idle"){
  statusEl.textContent = text;
  statusEl.className = "status " + type;
}

function showDebug(obj){
  debugEl.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
  debugEl.classList.add("show");
}

function roomCode(){
  return Math.floor(1000 + Math.random() * 9000).toString();
}

document.querySelectorAll(".mode").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".mode").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentRole = btn.dataset.role;
  });
});

document.getElementById("generateRoom").addEventListener("click", ()=>{
  document.getElementById("room").value = roomCode();
});

document.getElementById("joinBtn").addEventListener("click", async ()=>{
  try{
    debugEl.classList.remove("show");

    if(!window.P104_CONFIG || !window.P104_CONFIG.LIVEKIT_URL || !window.P104_CONFIG.TOKEN_FUNCTION_URL){
      setStatus("請先建立 config.js，並填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。", "error");
      return;
    }

    const identity = document.getElementById("identity").value.trim() || (currentRole === "guide" ? "Guide" : "Visitor");
    const room = document.getElementById("room").value.trim();

    if(!/^[0-9]{4}$/.test(room)){
      setStatus("房間碼必須是 4 位數字。", "error");
      return;
    }

    setStatus("正在向 Supabase Edge Function 取得 LiveKit token...");

    const res = await fetch(window.P104_CONFIG.TOKEN_FUNCTION_URL, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        room,
        identity,
        role: currentRole
      })
    });

    const data = await res.json().catch(()=>({ error:"Response is not JSON." }));

    if(!res.ok || !data.token){
      setStatus("無法取得 LiveKit token。請查看下方錯誤細節。", "error");
      showDebug(data);
      return;
    }

    setStatus("正在連線 LiveKit...");

    livekitRoom = new LivekitClient.Room({
      adaptiveStream: true,
      dynacast: true
    });

    livekitRoom.on(LivekitClient.RoomEvent.TrackSubscribed, (track)=>{
      if(track.kind === "audio"){
        const audio = track.attach();
        audio.autoplay = true;
        document.body.appendChild(audio);
      }
    });

    await livekitRoom.connect(window.P104_CONFIG.LIVEKIT_URL, data.token);

    if(currentRole === "guide"){
      await livekitRoom.localParticipant.setMicrophoneEnabled(true);
      setStatus(`導遊模式已連線。房間碼：${room}。麥克風已啟用。`, "ok");
    }else{
      setStatus(`遊客模式已連線。房間碼：${room}。正在收聽導覽。`, "ok");
    }

  }catch(err){
    console.error(err);
    setStatus("發生錯誤，請查看下方錯誤細節。", "error");
    showDebug(err.message || String(err));
  }
});
