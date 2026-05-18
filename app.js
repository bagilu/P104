let currentRole="guide";let livekitRoom=null;let isMuted=false;
const statusEl=document.getElementById("status"),debugEl=document.getElementById("debug"),guideToolsEl=document.getElementById("guideTools"),connectedToolsEl=document.getElementById("connectedTools"),listenerCountEl=document.getElementById("listenerCount"),muteBtn=document.getElementById("muteBtn"),leaveBtn=document.getElementById("leaveBtn");
function setStatus(t,type="idle"){statusEl.textContent=t;statusEl.className="status "+type}
function showDebug(o){debugEl.textContent=typeof o==="string"?o:JSON.stringify(o,null,2);debugEl.classList.add("show")}
function roomCode(){return Math.floor(1000+Math.random()*9000).toString()}
function buildJoinUrl(room){const u=new URL(window.location.href);u.searchParams.set("room",room);u.searchParams.set("role","listener");return u.toString()}
function updateListenerCount(){if(!livekitRoom||currentRole!=="guide")return;let c=0;livekitRoom.remoteParticipants.forEach(()=>c++);listenerCountEl.textContent=String(c)}
function showGuideQr(room){const url=buildJoinUrl(room);document.getElementById("joinUrlText").textContent=url;QRCode.toCanvas(document.getElementById("qrCanvas"),url,{width:132,margin:1})}
function applyUrlParams(){const p=new URLSearchParams(window.location.search);const room=p.get("room"),role=p.get("role");if(room&&/^[0-9]{4}$/.test(room))document.getElementById("room").value=room;if(role==="listener"){currentRole="listener";document.querySelectorAll(".mode").forEach(b=>b.classList.remove("active"));document.querySelector('.mode[data-role="listener"]').classList.add("active")}}
document.querySelectorAll(".mode").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".mode").forEach(b=>b.classList.remove("active"));btn.classList.add("active");currentRole=btn.dataset.role}));
document.getElementById("generateRoom").addEventListener("click",()=>{document.getElementById("room").value=roomCode()});
document.getElementById("joinBtn").addEventListener("click",joinTour);
muteBtn.addEventListener("click",async()=>{if(!livekitRoom||currentRole!=="guide")return;isMuted=!isMuted;await livekitRoom.localParticipant.setMicrophoneEnabled(!isMuted);muteBtn.textContent=isMuted?"取消靜音":"導遊靜音";setStatus(isMuted?"導遊模式已連線。麥克風目前靜音。":"導遊模式已連線。麥克風已啟用。","ok")});
leaveBtn.addEventListener("click",async()=>{if(livekitRoom){await livekitRoom.disconnect();livekitRoom=null}connectedToolsEl.classList.add("hidden");guideToolsEl.classList.add("hidden");setStatus("已離開導覽。","idle")});
async function joinTour(){try{debugEl.classList.remove("show");if(!window.P104_CONFIG||!window.P104_CONFIG.LIVEKIT_URL||!window.P104_CONFIG.TOKEN_FUNCTION_URL){setStatus("請先建立 config.js，並填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。","error");return}
const identity=document.getElementById("identity").value.trim()||(currentRole==="guide"?"Guide":"Visitor");const room=document.getElementById("room").value.trim();if(!/^[0-9]{4}$/.test(room)){setStatus("房間碼必須是 4 位數字。","error");return}
setStatus("正在向 Supabase Edge Function 取得 LiveKit token...");
const res=await fetch(window.P104_CONFIG.TOKEN_FUNCTION_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({room,identity:`${identity}-${Math.floor(Math.random()*10000)}`,role:currentRole})});
const data=await res.json().catch(()=>({error:"Response is not JSON."}));if(!res.ok||!data.token){setStatus("無法取得 LiveKit token。請查看下方錯誤細節。","error");showDebug(data);return}
setStatus("正在連線 LiveKit...");livekitRoom=new LivekitClient.Room({adaptiveStream:true,dynacast:true});
livekitRoom.on(LivekitClient.RoomEvent.TrackSubscribed,(track)=>{if(track.kind==="audio"){const audio=track.attach();audio.autoplay=true;document.body.appendChild(audio)}});
livekitRoom.on(LivekitClient.RoomEvent.ParticipantConnected,updateListenerCount);livekitRoom.on(LivekitClient.RoomEvent.ParticipantDisconnected,updateListenerCount);livekitRoom.on(LivekitClient.RoomEvent.Disconnected,()=>{connectedToolsEl.classList.add("hidden");guideToolsEl.classList.add("hidden");setStatus("連線已中斷。","idle")});
await livekitRoom.connect(window.P104_CONFIG.LIVEKIT_URL,data.token);connectedToolsEl.classList.remove("hidden");
if(currentRole==="guide"){await livekitRoom.localParticipant.setMicrophoneEnabled(true);isMuted=false;muteBtn.textContent="導遊靜音";muteBtn.classList.remove("hidden");guideToolsEl.classList.remove("hidden");showGuideQr(room);updateListenerCount();setStatus(`導遊模式已連線。房間碼：${room}。麥克風已啟用。`,"ok")}else{muteBtn.classList.add("hidden");guideToolsEl.classList.add("hidden");setStatus(`遊客模式已連線。房間碼：${room}。正在收聽導覽。`,"ok")}}
catch(err){console.error(err);setStatus("發生錯誤，請查看下方錯誤細節。","error");showDebug(err.message||String(err))}}
applyUrlParams();