// server.js
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3001;
const wsPort = 9999;
const rtspUrl = 'rtsp://admin:admin123@192.168.1.240:554'; // Replace with your RTSP URL

// Set up WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  // Convert RTSP to HLS using ffmpeg
  const ffmpegCommand = ffmpeg(rtspUrl)
    .inputOptions('-rtsp_transport', 'tcp')
    .outputOptions('-hls_time', '2')
    .outputOptions('-hls_list_size', '5')
    .outputOptions('-start_number', '1')
    .outputOptions('-hls_base_url', `http://localhost:${port}/stream1/`)
    .output('./public/stream1/index.m3u8')
    .on('end', () => {
      console.log('Conversion finished successfully.');
    })
    .on('error', (err) => {
      console.error('Error during conversion:', err);
    });

  ffmpegCommand.run();

  // Send HLS URL to the client
  const hlsUrl = `http://localhost:${port}/stream1/index.m3u8`;
  ws.send(JSON.stringify({ hlsUrl }));
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
