import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
    ep7: {
    video: "https://video-v81.mydramawave.com/vt/c4a0cada-0c44-4849-9d97-6ac646511ee0/9_1c5d61f5-8316-4eee-a4b6-6a92a2df3276_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/c4a0cada-0c44-4849-9d97-6ac646511ee0/tl-PH-a714fea1-7026-47b1-96ad-f78b885ad535/tl-PH-0714eb0c-4628-4fc3-82c2-7e009cd3ef37.m3u8"
  },
  ep8: {
    video: "https://video-v81.mydramawave.com/vt/156a8f7e-0f9c-4747-9278-dc08ae5bda0c/10_1d62239b-76a9-49ef-9aed-f1f6e581ccb3_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/156a8f7e-0f9c-4747-9278-dc08ae5bda0c/tl-PH-7e368555-29e7-4505-8d3b-1c8096e56ab3/tl-PH-a61e0bc7-5b42-446a-9256-e200df0f79cc.m3u8"
  },
  ep9: {
    video: "https://video-v6.mydramawave.com/vt/c40a6ea1-ad1a-4a31-9a3d-a0e49aa09f8c/11_506aa0fe-97b4-4923-810c-8596c9d957ad_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/c40a6ea1-ad1a-4a31-9a3d-a0e49aa09f8c/tl-PH-868adcb6-670f-4daa-b6de-dc9f12e1a368/tl-PH-9e6b2a22-18ee-42fd-b6d7-2a035c8f3c1a.m3u8"
  },
  ep10: {
    video: "https://video-v81.mydramawave.com/vt/34cb9f5d-6a94-4fe6-82a9-3f31924c2b21/12_2a77f726-cd3b-4f91-b631-69fe2cb5868b_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/34cb9f5d-6a94-4fe6-82a9-3f31924c2b21/tl-PH-ecbcc4fe-1180-4040-817c-75d7179855ca/tl-PH-4beb4eff-9efe-409b-b6e5-852e0b0796ea.m3u8"
  }
};

// 🔥 Output folder
const OUTPUT = "./streams";
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// 🔥 Running processes
const running = {};

// 🔥 Start stream
function startStream(ep) {
  if (running[ep]) return;

  const stream = EPISODES[ep];
  if (!stream) return;

  const dir = path.join(OUTPUT, ep);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`🚀 Starting ${ep}...`);

  const args = [
    "-loglevel", "error",

    // 🔥 RECONNECT (VERY IMPORTANT)
    "-reconnect", "1",
    "-reconnect_streamed", "1",
    "-reconnect_delay_max", "5",

    // 🔥 INPUT HEADERS
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.video,

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.audio,

    // 🔥 SYNC FIX
    "-async", "1",

    // 🔥 MAP
    "-map", "0:v:0",
    "-map", "1:a:0",

    // 🔥 COPY = NO CPU LOAD
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "128k",

    // 🔥 LOW LATENCY HLS (FAST START)
    "-f", "hls",
    "-hls_time", "2",
    "-hls_list_size", "5",
    "-hls_flags", "delete_segments+append_list+omit_endlist",
    "-hls_allow_cache", "0",

    // 🔥 Faster startup
    "-start_number", "1",

    path.join(dir, "index.m3u8")
  ];

  const ffmpeg = spawn("ffmpeg", args, {
    stdio: ["ignore", "ignore", "pipe"]
  });

  running[ep] = ffmpeg;

  ffmpeg.stderr.on("data", d => {
    console.log(`[${ep}] ${d.toString()}`);
  });

  ffmpeg.on("close", () => {
    console.log(`❌ ${ep} crashed. Restarting in 3s...`);
    running[ep] = null;
    setTimeout(() => startStream(ep), 3000);
  });
}

// 🔥 Start all
Object.keys(EPISODES).forEach(startStream);

// 🔥 Serve streams (with cache headers)
app.use("/live", express.static(OUTPUT, {
  setHeaders: (res) => {
    res.setHeader("Cache-Control", "no-store");
  }
}));

// 🔥 M3U playlist
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;

  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 tvg-id="${ep}" group-title="🎬 Drama",Episode ${i + 7}\n`;
    m3u += `${base}/live/${ep}/index.m3u8\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// 🔥 Download (optimized)
app.get("/download/:ep", (req, res) => {
  const ep = req.params.ep;
  const stream = EPISODES[ep];

  if (!stream) return res.status(404).send("Invalid episode");

  const file = path.join(OUTPUT, `${ep}.mp4`);

  const ffmpeg = spawn("ffmpeg", [
    "-loglevel", "error",
    "-i", stream.video,
    "-i", stream.audio,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c", "copy",
    "-movflags", "+faststart",
    file
  ]);

  ffmpeg.on("close", () => {
    res.download(file);
  });
});

// 🔥 Root
app.get("/", (req, res) => {
  res.send("🚀 Optimized IPTV Server Running");
});

// 🔥 Start server
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
