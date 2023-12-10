// server.js
const express = require('express');
const RtspStream = require('node-rtsp-stream');

const app = express();
const port = process.env.PORT || 3001;

// Set up RTSP stream
const rtspStream = new RtspStream({
  name: 'stream1',
  streamUrl: 'rtsp://admin:admin123@192.168.1.240:554', // Replace with your RTSP URL
  wsPort: 9999,
});

console.log("rtspStream", rtspStream);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
