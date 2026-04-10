import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// ================================
// 🔥 Episodes
// ================================
const EPISODES = {
  ep1: {
    video: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/1_417e78f3-50b1-4bf6-bc2e-9d5bc3801084_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/tl-PH-b8ae2967-1d56-4b87-9fb2-552bfec75372/tl-PH-9d84fad4-f7de-4b02-bbb8-a7b6dac8ae79.m3u8"
  },
  ep2: {
    video: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/2_bdd85527-14cb-4f9e-8302-ca9c4ae038ae_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/tl-PH-d5043ad9-7190-4b23-b9c7-5e8d46a4e678/tl-PH-d307e6e0-87e9-4413-863e-9da4b0d487f1.m3u8"
  }
  // add others same way...
};

// ================================
// 📁 Output
// ================================
const OUTPUT = "./streams";
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// running processes
const running = {};

// ================================
// 🚀 FIXED FFmpeg STREAM (VOD STABLE)
// ================================
function startStream(ep) {
  if (running[ep]) return;

  const stream = EPISODES[ep];
  if (!stream) return;

  const dir = path.join(OUTPUT, ep);
  fs.mkdirSync(dir, { recursive: true });

  const outputPath = path.join(dir, "index.m3u8");

  console.log(`🚀 Starting VOD: ${ep}`);

  const ffmpegArgs = [
    "-hide_banner",
    "-loglevel", "warning",

    // reconnect
    "-reconnect", "1",
    "-reconnect_streamed", "1",
    "-reconnect_delay_max", "5",

    // INPUT VIDEO
    "-user_agent", "Mozilla/5.0",
    "-headers", "Referer: https://mydramawave.com/\r\n",
    "-i", stream.video,

    // INPUT AUDIO
    "-user_agent", "Mozilla/5.0",
    "-headers", "Referer: https://mydramawave.com/\r\n",
    "-i", stream.audio,

    // mapping
    "-map", "0:v:0",
    "-map", "1:a:0",

    // encoding
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "128k",

    // =========================
    // 🔥 IMPORTANT FIXES
    // =========================
    "-f", "hls",
    "-hls_time", "4",
    "-hls_list_size", "0",
    "-hls_playlist_type", "vod",
    "-hls_flags", "independent_segments+program_date_time",
    "-hls_segment_filename", path.join(dir, "seg_%03d.ts"),
    "-start_number", "0",

    outputPath
  ];

  const ffmpeg = spawn("ffmpeg", ffmpegArgs, {
    stdio: ["ignore", "pipe", "pipe"]
  });

  running[ep] = ffmpeg;

  ffmpeg.stderr.on("data", (data) => {
    console.log(`[${ep}] ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`❌ ${ep} exited (${code})`);
    running[ep] = null;

    // only restart on crash
    if (code !== 0) {
      setTimeout(() => startStream(ep), 3000);
    }
  });
}

// ================================
// 🎬 PLAY ROUTE
// ================================
app.get("/play/:ep", (req, res) => {
  const ep = req.params.ep;

  if (!EPISODES[ep]) return res.status(404).send("Episode not found");

  startStream(ep);
  res.redirect(`/live/${ep}/index.m3u8`);
});

// ================================
// 📁 STATIC STREAM
// ================================
app.use("/live", express.static(OUTPUT, {
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "no-store");
  }
}));

// ================================
// 🎬 PLAYLIST
// ================================
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;

  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 tvg-id="${ep}" group-title="Drama",Episode ${i + 1}\n`;
    m3u += `${base}/play/${ep}\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// ================================
// 🏠 ROOT
// ================================
app.get("/", (req, res) => {
  res.send("🚀 VOD IPTV Server Running (FIXED + STABLE)");
});

// ================================
// 🚀 START SERVER
// ================================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
