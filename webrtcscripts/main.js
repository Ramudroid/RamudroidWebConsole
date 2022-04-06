(function () {
    var signalObj = null;

    window.addEventListener('DOMContentLoaded', function () {
        var isStreaming = false;
        var start = document.getElementById('startwebrtcstream');
        var stop = document.getElementById('stopwebrtcstream');
        var video = document.getElementById('videowebrtc');
        var canvas = document.getElementById('canvaswebrtc');
        var ctx = canvas.getContext('2d');
        var effect = document.getElementById('effect');
        var isEffectActive = false;

        start.addEventListener('click', function (e) {
            var address = document.getElementById('address').value;
            var protocol = location.protocol === "https:" ? "wss:" : "ws:";
            // var protocol ="ws:";
            var wsurl = protocol + '//' + address;

            if (!isStreaming) {
                signalObj = new signal(wsurl,
                    //onStream, 
                    function (stream) {
                        console.log('got a stream!' , stream);
                        //var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream; // deprecated
                        console.log(" add stream to video ", video);
                        video.srcObject = stream;
                        video.play();
                    },
                    //onError
                    function (error) {
                        alert(error);
                    },
                    // onClose 
                    function () {
                        console.log('websocket closed');
                        video.srcObject = null;
                        //video.src = ''; // deprecated
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        isStreaming = false;
                    },
                    //onMessage
                    function (message) {
                        console.info(message);
                    }
                );
            }
        }, false);

        stop.addEventListener('click', function (e) {
            if (signalObj) {
                signalObj.hangup();
                signalObj = null;
            }
        }, false);

        // Wait until the video stream can play
        video.addEventListener('canplay', function (e) {
            if (!isStreaming) {
                canvas.setAttribute('width', video.videoWidth);
                canvas.setAttribute('height', video.videoHeight);
                isStreaming = true;
            }
        }, false);

        // Wait for the video to start to play
        video.addEventListener('play', function () {
            // Every 33 milliseconds copy the video image to the canvas
            setInterval(function () {
                if (video.paused || video.ended) {
                    return;
                }
                var w = canvas.getAttribute('width');
                var h = canvas.getAttribute('height');
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(video, 0, 0, w, h);
                if (isEffectActive) {
                    detectFace(canvas);
                }
            }, 33);
        }, false);

        effect.addEventListener('click', function () {
            isEffectActive = !isEffectActive;
        }, false);
    });
})();