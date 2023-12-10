// server.js
const express = require('express');
const RtspStream = require('node-rtsp-stream');

const app = express();
const port = process.env.PORT || 3001;

// Set up RTSP stream
const rtspStream = new RtspStream({
  name: 'stream1',
  streamUrl: 'rtsp://your_rtsp_url', // Replace with your RTSP URL
  wsPort: 9999,
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
