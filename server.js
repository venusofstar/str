import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episode sources
const EPISODES = {
  ep1: {
    video: "https://video-v6.mydramawave.com/vt/e8d93b0d-4015-4dd0-b79b-bc93a433c005/37_61691145-ae17-42c2-953b-3154375adadc_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e8d93b0d-4015-4dd0-b79b-bc93a433c005/tl-PH-c0e43b12-1c42-4027-8f48-040ed9af9d73/tl-PH-2ca449d8-c8a3-4431-a249-70cc54c2550f.m3u8"
  },
  ep2: {
    video: "https://video-v6.mydramawave.com/vt/22c03de5-4e75-4f3e-bb88-734ddef192d3/4_32592a31-05c9-43ae-b452-18c197a30e98_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/22c03de5-4e75-4f3e-bb88-734ddef192d3/tl-PH-759393d4-8cd7-4530-9c60-fd9a644a41f3/tl-PH-0dd055c6-61e5-4561-9158-1d9518c7e82d.m3u8"
  },
  ep3: {
    video: "https://video-v81.mydramawave.com/vt/f563b1a6-368c-4cbc-abfb-ee47944a8d13/5_8950a1e7-19e0-4d02-83a4-055690966415_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/f563b1a6-368c-4cbc-abfb-ee47944a8d13/tl-PH-61a057ea-b65d-4177-817a-d3bbd8bf4501/tl-PH-ca56da7d-f9df-485b-acff-ae7c16305821.m3u8"
  },
  ep4: {
    video: "https://video-v81.mydramawave.com/vt/fe01160a-18aa-456e-a0ad-bb6222e3e8a5/6_a977ff04-614d-4db2-a9bd-d95d5811fcdf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/fe01160a-18aa-456e-a0ad-bb6222e3e8a5/tl-PH-b19c8df1-3752-4bdc-a5e3-84093c460f25/tl-PH-03aaad90-ab7a-4608-b44e-7945451ee2fb.m3u8"
  },
  ep5: {
    video: "https://video-v6.mydramawave.com/vt/ecf35429-2b43-4035-8599-566e31a2916c/7_0f72fc8b-47ca-4f92-a02c-8097b3d8d1bb_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/ecf35429-2b43-4035-8599-566e31a2916c/tl-PH-e122f599-d534-4a8a-ae98-50f6ff16c115/tl-PH-71ed9dcb-6ddb-49a2-ba22-468770e2b810.m3u8"
  },
  ep6: {
    video: "https://video-v81.mydramawave.com/vt/07c96927-cad8-4c55-8a2b-156fa9e333a1/8_11536dd1-05b3-4345-8467-24999e7b8f30_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/07c96927-cad8-4c55-8a2b-156fa9e333a1/tl-PH-7d676034-1215-4bcd-8c92-bb9ca3431582/tl-PH-a9c6d201-74b7-4ef6-8365-83a788eda7c9.m3u8"
  }
};

// 🔥 Output folder
const OUTPUT = "./streams";
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// 🔥 Track running FFmpeg processes
const running = {};

// 🔥 Start stream per episode
function startStream(ep) {
  if (running[ep]) return;

  const stream = EPISODES[ep];
  if (!stream) return;

  const dir = path.join(OUTPUT, ep);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const args = [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.video,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.audio,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-f", "hls",
    "-hls_time", "6",
    "-hls_list_size", "10",
    "-hls_flags", "delete_segments",
    path.join(dir, "index.m3u8")
  ];

  const ffmpeg = spawn("ffmpeg", args);
  running[ep] = ffmpeg;

  ffmpeg.stderr.on("data", d => {
    console.log(`[${ep}] ${d}`);
  });

  ffmpeg.on("close", () => {
    console.log(`${ep} stopped. Restarting...`);
    running[ep] = null;
    setTimeout(() => startStream(ep), 5000);
  });
}

// 🔥 Start all episodes automatically
Object.keys(EPISODES).forEach(startStream);

// 🔥 Serve HLS streams
app.use("/live", express.static(OUTPUT));

// 🔥 M3U Playlist Endpoint
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;

  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 group-title="🎬 Drama Series",Episode ${i + 1}\n`;
    m3u += `${base}/live/${ep}/index.m3u8\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// 🔥 Download endpoint per episode
app.get("/download/:ep", (req, res) => {
  const ep = req.params.ep;
  const stream = EPISODES[ep];

  if (!stream) return res.status(404).send("Invalid episode");

  const file = `${ep}.mp4`;

  const ffmpeg = spawn("ffmpeg", [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.video,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.audio,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c", "copy",
    "-f", "mp4",
    file
  ]);

  ffmpeg.on("close", () => {
    res.download(file);
  });
});

// 🔥 Root
app.get("/", (req, res) => {
  res.send("🚀 Multi Episode IPTV Server Running");
});

// 🔥 Start server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
