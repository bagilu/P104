
const statusEl = document.getElementById("status");

function generateRoomCode(){
  return Math.floor(1000 + Math.random() * 9000).toString();
}

document.getElementById("generateRoom").onclick = ()=>{
  document.getElementById("room").value = generateRoomCode();
};

document.getElementById("joinBtn").onclick = async ()=>{
  try{

    if(!window.P104_CONFIG){
      alert("請先建立 config.js，並填入 LIVEKIT_URL 與 TOKEN_FUNCTION_URL。");
      return;
    }

    const role = document.getElementById("role").value;
    const identity = document.getElementById("identity").value.trim();
    const room = document.getElementById("room").value.trim();

    statusEl.innerText = "正在取得 token...";

    const res = await fetch(
      window.P104_CONFIG.TOKEN_FUNCTION_URL,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          room,
          identity,
          role
        })
      }
    );

    const data = await res.json();

    if(!data.token){
      console.error(data);
      alert("無法取得 LiveKit token");
      return;
    }

    statusEl.innerText = "正在連線 LiveKit...";

    const roomObj = new LivekitClient.Room();

    await roomObj.connect(
      window.P104_CONFIG.LIVEKIT_URL,
      data.token
    );

    if(role === "guide"){
      await roomObj.localParticipant.setMicrophoneEnabled(true);
      statusEl.innerText = "導遊模式：麥克風已啟用";
    }else{
      statusEl.innerText = "遊客模式：正在收聽";
    }

    roomObj.on(
      LivekitClient.RoomEvent.TrackSubscribed,
      (track)=>{
        if(track.kind === "audio"){
          const audio = track.attach();
          document.body.appendChild(audio);
        }
      }
    );

  }catch(err){
    console.error(err);
    alert("發生錯誤，請查看 console");
  }
};
