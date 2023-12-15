const express = require("express");
const app = express();

const { proxy, scriptUrl } = require("rtsp-relay")(app);

// const handler = proxy({
//   url: `rtsp://admin:admin123@192.168.1.240:554`,
//   // if your RTSP stream need credentials, include them in the URL as above
//   verbose: false,
// });

// // the endpoint our RTSP uses
// app.ws("/api/stream", handler);

// // this is an example html page to view the stream
// app.get('/', (req, res) => {

//   return (
//       res.send(`
//   <canvas id='canvas'></canvas>

//   <script src='${scriptUrl}'></script>
//   <script>
//     loadPlayer({
//       url: 'ws://' + location.host + '/api/stream',
//       canvas: document.getElementById('canvas')
//     });
//   </script>
// `),
//   )
// }

// );

app.get("/", (req, res) => {
  const { rtsp } = req.query;
  if (!rtsp) {
    return res.send(`<h1> RTSP NOT FOUND </h1>`)
  } 
  const handler = proxy({
    url: rtsp,
    // if your RTSP stream need credentials, include them in the URL as above
    verbose: false,
  });
  app.ws("/api/stream", handler);
  res.send(`
  <canvas id='canvas'></canvas>

  <script src='${scriptUrl}'></script>
  <script>
    loadPlayer({
      url: 'ws://' + location.host + '/api/stream',
      canvas: document.getElementById('canvas')
    });
  </script>
`);
});

app.listen(2000);
