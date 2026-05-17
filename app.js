const { Room, RoomEvent, Track } = LivekitClient;

const cfg = window.P104_CONFIG || {};
let room = null;
let localAudioTrack = null;
let currentRole = null;

const $ = (id) => document.getElementById(id);

function setStatus(text, type = "") {
  const badge = $("statusBadge");
  badge.textContent = text;
  badge.className = "badge" + (type ? ` ${type}` : "");
}

function randomRoomCode() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `WT-${n}`;
}

function getJoinUrl(roomName) {
  const url = new URL(window.location.href);
  url.searchParams.set("room", roomName);
  url.searchParams.set("role", "listener");
  return url.toString();
}

async function getToken({ roomName, identity, role }) {
  const resp = await fetch(cfg.TOKEN_FUNCTION_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ room: roomName, identity, role })
  });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) throw new Error(data.error || "無法取得 LiveKit token");
  return data.token;
}

async function join(role) {
  if (!cfg.LIVEKIT_URL || !cfg.TOKEN_FUNCTION_URL) {
    alert("請先建立 config.js，並填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。");
    return;
  }

  const roomName = $("roomInput").value.trim();
  const fallbackName = role === "guide" ? "guide" : `visitor-${Math.floor(Math.random() * 1000)}`;
  const identity = $("nameInput").value.trim() || fallbackName;
  if (!roomName) return alert("請輸入導覽房間碼。");

  currentRole = role;
  $("setupCard").classList.add("hidden");
  $("tourCard").classList.remove("hidden");
  $("roomLabel").textContent = roomName;
  $("roleLabel").textContent = role === "guide" ? `導遊：${identity}` : `遊客：${identity}`;
  $("guidePanel").classList.toggle("hidden", role !== "guide");
  $("listenerPanel").classList.toggle("hidden", role !== "listener");
  setStatus("取得權限中");

  try {
    const token = await getToken({ roomName, identity, role });
    room = new Room({ adaptiveStream: true, dynacast: true });

    room.on(RoomEvent.ParticipantConnected, updateCount);
    room.on(RoomEvent.ParticipantDisconnected, updateCount);
    room.on(RoomEvent.TrackSubscribed, (track) => {
      if (track.kind === Track.Kind.Audio) {
        const el = track.attach();
        el.autoplay = true;
        document.body.appendChild(el);
        $("audioStatus").textContent = "已收到導遊音訊";
        const playBtn = $("startAudioBtn");
        playBtn.classList.remove("hidden");
        playBtn.onclick = () => el.play().catch(() => {});
      }
    });
    room.on(RoomEvent.Disconnected, () => setStatus("已離線"));

    await room.connect(cfg.LIVEKIT_URL, token);
    setStatus("已連線", "ok");
    updateCount();

    if (role === "guide") {
      localAudioTrack = await LivekitClient.createLocalAudioTrack({
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      });
      await room.localParticipant.publishTrack(localAudioTrack);
      $("audioStatus").textContent = "麥克風開啟中";
      QRCode.toCanvas($("qrCanvas"), getJoinUrl(roomName), { width: 220, margin: 2 });
    } else {
      $("audioStatus").textContent = "等待導遊音訊";
      $("startAudioBtn").classList.remove("hidden");
      $("startAudioBtn").onclick = () => room.startAudio();
    }
  } catch (err) {
    console.error(err);
    setStatus("連線失敗", "err");
    alert(err.message || "連線失敗");
  }
}

function updateCount() {
  if (!room) return;
  $("participantCount").textContent = String(room.remoteParticipants.size + 1);
}

async function toggleMute() {
  if (!localAudioTrack) return;
  if (localAudioTrack.isMuted) {
    await localAudioTrack.unmute();
    $("muteBtn").textContent = "暫停麥克風";
    $("audioStatus").textContent = "麥克風開啟中";
  } else {
    await localAudioTrack.mute();
    $("muteBtn").textContent = "恢復麥克風";
    $("audioStatus").textContent = "麥克風已暫停";
  }
}

function leave() {
  if (room) room.disconnect();
  window.location.href = window.location.pathname;
}

function initFromUrl() {
  const url = new URL(window.location.href);
  const roomName = url.searchParams.get("room");
  const role = url.searchParams.get("role");
  if (roomName) $("roomInput").value = roomName;
  if (role === "listener") $("nameInput").value = `visitor-${Math.floor(Math.random() * 1000)}`;
}

$("randomRoomBtn").onclick = () => $("roomInput").value = randomRoomCode();
$("guideBtn").onclick = () => join("guide");
$("listenerBtn").onclick = () => join("listener");
$("muteBtn").onclick = toggleMute;
$("leaveBtn").onclick = leave;
initFromUrl();
