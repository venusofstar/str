const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// =======================
// CONFIG
// =======================
const BASE_ID = "ch0000009099000000";
const ORIGIN = "http://143.44.136.67:6060";

// =======================
// HOME
// =======================
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>MPD Proxy</title></head>
      <body style="font-family:Arial;text-align:center;margin-top:50px">
        <h1>WELCOME</h1>
        <p>😀</p>
        <p>ENJOY YOUR LIFE</p>
      </body>
    </html>
  `);
});

// =======================
// MPD PROXY
// =======================
app.get("/:channelId/manifest.mpd", async (req, res) => {
  const { channelId } = req.params;

  // Channel path (unchanged)
  const channelPath = `${BASE_ID}${channelId}`;

  // Optimized ztecid (same base, auto-rotation ready)
  const ztecid = `${BASE_ID}${channelId.padStart(4, "0")}`;

  const mpdURL = `${ORIGIN}/001/2/${channelPath}/manifest.mpd` +
    `?JITPDRMType=Widevine` +
    `&virtualDomain=001.live_hls.zte.com` +
    `&m4s_min=1` +
    `&ztecid=${ztecid}`;

  try {
    const response = await fetch(mpdURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    res.set("Content-Type", "application/dash+xml");
    res.set("Cache-Control", "no-store");
    response.body.pipe(res);

  } catch (err) {
    res.status(500).send("Stream error");
  }
});

// =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
