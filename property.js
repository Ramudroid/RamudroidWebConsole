option = {
  // serverip: "127.0.0.1",                 // remove laptop/computer hosting the web dashboard 
  web_server: "127.0.0.1:8084",             // Ip of teh web server 
  rpi_streaming_server: "127.0.0.1:8080",   // UV4l streamning server on webrtc on rpi
  rpi_streaming_ip : "http://127.0.0.1:8081/stream/video.mjpeg",
  size: 'big',
  enabled: true,
  count: 5,
  rpi_controller_ip: "127.0.0.1:5000"  // flash server on python looking for pin chnge operation to share with arduino 
};