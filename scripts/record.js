// Record the webRTC media stream 

var recordedChunks = [];
function record(){
    var stream = canvaswebrtc.captureStream(25);
    recordedChunks = [];

    console.log(stream);
    var options = { mimeType: "video/webm; codecs=vp9" };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();


    // demo: to download after 9sec
    setTimeout(event => {
      console.log("stopping");
      mediaRecorder.stop();
    }, 9000);
}

function handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(recordedChunks);
    download();
  } else {
    console.error("Error in downloading")
  }
}

function download() {
  var blob = new Blob(recordedChunks, {
    type: "video/webm"
  });
  var URL = window.URL || window.webkitURL
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}
