const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Home page
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>AuthInfo Proxy</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>WELCOME</h1>
        <p>😀</p>
        <p>ENJOY YOUR LIFE</p>
      </body>
    </html>
  `);
});

// Combined HLS first, DASH second
app.get("/:channelId/manifest.mpd", (req, res) => {
  const { channelId } = req.params;
  const { fallback } = req.query;

  if (!fallback) {
    // First load → redirect to Mux HLS
    const hlsURL = "https://stream.mux.com/uv9jestcZfYGLeO49oJzRUMJIlLqGKPpzN01x7rN9hhk.m3u8?redundant_streams=true";
    // Append fallback query so next request can load DASH
    return res.redirect(`${hlsURL}?fallback=true`);
  }

  // Second load → redirect to DASH
  const dashURL = `http://143.44.136.67:6060/001/2/ch0000009099000000${channelId}/manifest.mpd?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1`;
  res.redirect(dashURL);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
