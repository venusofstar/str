import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 CORS (for web players / IPTV apps)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

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
  },
  ep6: {
    video: "https://video-v81.mydramawave.com/vt/07c96927-cad8-4c55-8a2b-156fa9e333a1/8_11536dd1-05b3-4345-8467-24999e7b8f30_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/07c96927-cad8-4c55-8a2b-156fa9e333a1/tl-PH-7d676034-1215-4bcd-8c92-bb9ca3431582/tl-PH-a9c6d201-74b7-4ef6-8365-83a788eda7c9.m3u8"
  },
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
  },
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
  // 👉 Add ep6–ep15 same format if needed
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

  // ✅ Clean old files
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });

  const args = [
    "-reconnect", "1",
    "-reconnect_streamed", "1",
    "-reconnect_delay_max", "5",

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.video,

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", stream.audio,

    "-map", "0:v:0",
    "-map", "1:a:0",

    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "128k",
    "-ac", "2",

    "-f", "hls",
    "-hls_time", "4",
    "-hls_list_size", "6",
    "-hls_flags", "delete_segments+append_list+omit_endlist",
    "-hls_allow_cache", "0",

    path.join(dir, "index.m3u8")
  ];

  const ffmpeg = spawn("ffmpeg", args);
  running[ep] = ffmpeg;

  ffmpeg.stderr.on("data", d => {
    console.log(`[${ep}] ${d}`);
  });

  ffmpeg.on("error", err => {
    console.error(`[${ep}] FFmpeg error:`, err);
  });

  ffmpeg.on("close", () => {
    console.log(`${ep} stopped. Restarting...`);
    running[ep] = null;
    setTimeout(() => startStream(ep), 5000);
  });
}

// 🔥 Start all episodes
Object.keys(EPISODES).forEach(startStream);

// 🔥 Serve HLS
app.use("/live", express.static(OUTPUT));

// 🔥 M3U Playlist
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

// 🔥 JSON API
app.get("/api/episodes", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;

  const list = Object.keys(EPISODES).map((ep, i) => ({
    name: `Episode ${i + 1}`,
    url: `${base}/live/${ep}/index.m3u8`
  }));

  res.json(list);
});

// 🔥 Download endpoint
app.get("/download/:ep", (req, res) => {
  const ep = req.params.ep;
  const stream = EPISODES[ep];

  if (!stream) return res.status(404).send("Invalid episode");

  const file = path.join(OUTPUT, `${ep}-${Date.now()}.mp4`);

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
    res.download(file, () => {
      fs.unlink(file, () => {});
    });
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
