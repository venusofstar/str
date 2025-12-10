const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // npm install node-fetch@2
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

// Combined HLS first, DASH second without query params
app.get("/:channelId/manifest.mpd", async (req, res) => {
  const { channelId } = req.params;

  // Fixed HLS URL
  const hlsURL = "https://stream.mux.com/uv9jestcZfYGLeO49oJzRUMJIlLqGKPpzN01x7rN9hhk.m3u8?redundant_streams=true";

  // DASH URL
  const dashURL = `http://143.44.136.67:6060/001/2/ch0000009099000000${channelId}/manifest.mpd?JITPDRMType=Widevine&virtualDomain=001.live_hls.zte.com&m4s_min=1`;

  try {
    // Check if HLS URL is reachable
    const hlsResponse = await fetch(hlsURL, { method: 'HEAD' }); // HEAD is faster
    if (hlsResponse.ok) {
      // HLS is available → redirect to it
      return res.redirect(hlsURL);
    } 
  } catch (err) {
    // HLS failed, will fallback to DASH
  }

  // Fallback to DASH
  res.redirect(dashURL);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
