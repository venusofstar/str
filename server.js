import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
  ep11: {
    video: "https://video-v81.mydramawave.com/vt/ac359922-6016-4a8f-bad2-7fcf511c6db6/13_98f737c6-2b3b-4609-b525-9ea82ab1299f_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/ac359922-6016-4a8f-bad2-7fcf511c6db6/tl-PH-fc7909c9-6709-4656-91c2-937441b43cd8/tl-PH-0c6a8e90-844f-4efa-9495-d6fb2e41ff47.m3u8"
  },
  ep12: {
    video: "https://video-v81.mydramawave.com/vt/e0ec154b-e668-4f7a-966b-4f0a8c0e2aff/14_74955957-d468-4ee8-9de9-b14733f87dc8_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/e0ec154b-e668-4f7a-966b-4f0a8c0e2aff/tl-PH-56aee61e-5066-45f7-9a59-b97faf73b350/tl-PH-0fed80a2-5901-4627-a41b-8823448ba892.m3u8"
  },
  ep13: {
    video: "https://video-v6.mydramawave.com/vt/ff7f2a21-7ff1-412e-a678-5c73b396ea7f/15_933b83cf-3ad6-4a45-9992-4ddefe0a7e9c_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/ff7f2a21-7ff1-412e-a678-5c73b396ea7f/tl-PH-fd42bbce-3e01-433e-8dfa-34956577b79a/tl-PH-4e5bd72c-112d-4ffe-8465-531cf6264acd.m3u8"
  },
  ep14: {
    video: "https://video-v6.mydramawave.com/vt/173c8db8-3916-4c9b-b9e1-bff2c02a3381/16_a28bf8d6-49a8-4ff3-8358-4e58e659553c_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/173c8db8-3916-4c9b-b9e1-bff2c02a3381/tl-PH-e5b7d63e-b167-4058-92ea-f2556b4456f8/tl-PH-b0b8fb36-255d-4010-a09a-c4ea6da59c96.m3u8"
  },
  ep15: {
    video: "https://video-v81.mydramawave.com/vt/492fc8c5-dd0d-4bb8-8d73-d707cc006b73/17_0bd335e5-2785-4471-8d13-b0940e03e320_transcode_1309546_adaptiveDynamicStreaming_1529555_3.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/492fc8c5-dd0d-4bb8-8d73-d707cc006b73/tl-PH-0b40a1dc-5a10-4332-9f8a-f2e314b807cf/tl-PH-6987b007-c2ba-4dea-8657-83c10bc307fc.m3u8"
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
