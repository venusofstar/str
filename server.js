import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
  ep1: {
    video: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/1_417e78f3-50b1-4bf6-bc2e-9d5bc3801084_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/tl-PH-b8ae2967-1d56-4b87-9fb2-552bfec75372/tl-PH-9d84fad4-f7de-4b02-bbb8-a7b6dac8ae79.m3u8"
  },

  ep2: {
    video: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/2_bdd85527-14cb-4f9e-8302-ca9c4ae038ae_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/tl-PH-d5043ad9-7190-4b23-b9c7-5e8d46a4e678/tl-PH-d307e6e0-87e9-4413-863e-9da4b0d487f1.m3u8"
  },

  ep3: {
    video: "https://video-v81.mydramawave.com/vt/49efe663-0158-498a-953f-199c7dc6baf3/5_254e6203-4fda-4c10-905c-0de3371d0d4d_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/49efe663-0158-498a-953f-199c7dc6baf3/tl-PH-863eb709-b9ef-43b7-93e6-94d4514a175e/tl-PH-96acd809-4121-4e43-873b-78f6708bb659.m3u8"
  },

  ep4: {
    video: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/6_9c9b1601-0390-4019-a3ec-7106be4852fa_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/tl-PH-71cc7843-8a04-4be8-86ff-3480dc732d40/tl-PH-fdf36565-801c-437d-a277-ab2476624690.m3u8"
  },

  ep5: {
    video: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/7_b3402287-e086-4f5e-9dd2-a7daf5aecfcf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/tl-PH-b1651951-3671-4c05-af1e-cfdf21fe02ad/tl-PH-3cd96374-26fc-426a-9e2f-8071927c2a61.m3u8"
  },

  ep6: {
    video: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/6_9c9b1601-0390-4019-a3ec-7106be4852fa_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/tl-PH-71cc7843-8a04-4be8-86ff-3480dc732d40/tl-PH-fdf36565-801c-437d-a277-ab2476624690.m3u8"
  },

  ep7: {
    video: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/7_b3402287-e086-4f5e-9dd2-a7daf5aecfcf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/tl-PH-b1651951-3671-4c05-af1e-cfdf21fe02ad/tl-PH-3cd96374-26fc-426a-9e2f-8071927c2a61.m3u8"
  },

  ep8: {
    video: "https://video-v6.mydramawave.com/vt/494fbeac-f4be-4383-aa64-bab3cf861340/8_df98df98-6b44-4e49-884f-4fdd2fd556f8_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/494fbeac-f4be-4383-aa64-bab3cf861340/tl-PH-c61ab8c6-3709-4416-a029-d48a11d7b830/tl-PH-fa52ab35-5cc0-4cc1-bdc0-d86fbdffa596.m3u8"
  },

  ep9: {
    video: "https://video-v6.mydramawave.com/vt/4536561d-7387-44e8-92a9-1e55500207e9/9_e5eb5def-30d7-47cb-87cc-3334a4f4e99e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/4536561d-7387-44e8-92a9-1e55500207e9/tl-PH-4dd478f8-aae6-4e94-a568-ec7e6bc380fb/tl-PH-9e625ff4-8961-4960-bdcb-3244e3b6cb7f.m3u8"
  },

  ep10: {
    video: "https://video-v6.mydramawave.com/vt/88d50ed0-e31d-4759-aa17-0c4d83013504/10_041a0aff-f60e-42ae-8a4a-657e5081fb08_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/88d50ed0-e31d-4759-aa17-0c4d83013504/tl-PH-7d4842ac-620a-4279-8f78-c95ae0ed73a8/tl-PH-9b38e732-5b68-4a18-868c-a505ace4b942.m3u8"
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
