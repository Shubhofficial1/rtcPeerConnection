const localVideoEl = document.querySelector("#local-video");
const remoteVideoEl = document.querySelector("#remote-video");

let localStream;
let remoteStream;
let peerConnection;

const call = async (e) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });
  localVideoEl.srcObject = stream;
};

document.querySelector("#call").addEventListener("click", call);
