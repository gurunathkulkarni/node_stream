// server.js
const express = require('express');
const RtspStream = require('node-rtsp-stream');

const app = express();
const port = process.env.PORT || 3001;

// Set up RTSP stream
const rtspStream = new RtspStream({
  name: 'stream1',
  streamUrl: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4', // Replace with your RTSP URL
  wsPort: 9999,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
