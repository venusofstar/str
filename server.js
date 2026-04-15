
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep21: {
  video: "https://video-v81.mydramawave.com/vt/a92fe679-3a47-46b0-9f44-e65bdb7dc497/21_9f4c9c00-adb0-4bb6-8b79-a10bb3d44b56_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a92fe679-3a47-46b0-9f44-e65bdb7dc497/tl-PH-89219dc0-d761-4c9d-81f0-f568bf955e04/tl-PH-99ab7bf5-1680-41d6-abfd-90b5ae2ac7b6.m3u8"
},

ep22: {
  video: "https://video-v81.mydramawave.com/vt/8de95136-07ee-4145-b849-a59c473f08c2/22_0b276605-7e33-405e-93ca-67be0b9e111f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8de95136-07ee-4145-b849-a59c473f08c2/tl-PH-04412323-3a93-4d39-9d8d-bf3cc6b6cac0/tl-PH-d4ebc7e0-2d89-4d84-95e3-1d29d804895c.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/f6666069-b3e4-4067-be1b-111958bf643e/23_56e31b47-8856-46c2-9fa3-7df6a07baeff_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f6666069-b3e4-4067-be1b-111958bf643e/tl-PH-c1c6103b-6131-4cce-b0e2-4acf350d35bd/tl-PH-645732e0-92cb-4ae5-a081-f58b5047b9d8.m3u8"
},

ep24: {
  video: "https://video-v6.mydramawave.com/vt/da78d769-8508-4aa6-b4c1-17b22d493728/24_8eabc9fd-6b12-4945-b133-123c563fce5f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/da78d769-8508-4aa6-b4c1-17b22d493728/tl-PH-3b7c0f7e-4f31-4c67-a53d-9521810d1b43/tl-PH-62c1f6f6-0610-40e2-bf40-373830bc35d1.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/762e0a38-7918-4008-9e22-4d7fd5c05088/25_ef9cbf16-3970-4237-81b8-b1d8163b2000_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/762e0a38-7918-4008-9e22-4d7fd5c05088/tl-PH-fce02235-6aac-4054-8200-2eed35533766/tl-PH-a49dd4f3-85c5-4528-a595-397bf232f218.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/693f145d-2cb8-4ddb-ab99-eab4cecbadb1/26_01144eb4-4efa-4c8f-ae8b-00fe0a6ebf79_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/693f145d-2cb8-4ddb-ab99-eab4cecbadb1/tl-PH-d589ec96-daa5-4aee-952a-b85d3feb9808/tl-PH-f6bc7ae7-fbe0-4ed7-a770-6a6117b1b63f.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/69724725-acb9-430d-bbb4-20854e29ab4d/27_19c1141d-12c9-41b8-a700-645dd2d164b7_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/69724725-acb9-430d-bbb4-20854e29ab4d/tl-PH-c28339a4-c4cd-4932-96fb-e56b3a908b92/tl-PH-89b001a3-836a-4c7e-be7c-abb60d0d19cf.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/b07ad531-001a-47d6-9d9d-2061aae835d0/28_4cce8c7d-9554-4c67-8dcc-1628a204868a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b07ad531-001a-47d6-9d9d-2061aae835d0/tl-PH-8c713de1-f579-4cb0-8906-99d9553ae9e7/tl-PH-b78a35f6-c8f6-4c25-b665-b2f3f8a571bc.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/f73dc78b-bf4f-4110-8472-09124198d944/29_01918ad9-7d8d-4c79-9e3a-2e29172efeaf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f73dc78b-bf4f-4110-8472-09124198d944/tl-PH-4f45afaa-42e9-4956-b36e-da4cd1f383eb/tl-PH-53e1b154-cc53-437e-a2d4-4b572a522fe6.m3u8"
},

ep30: {
  video: "https://video-v81.mydramawave.com/vt/a539bafe-b7e4-41b5-8e73-29e3eee59fb3/30_ab0771ab-f02d-4674-9302-7052d4158a29_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a539bafe-b7e4-41b5-8e73-29e3eee59fb3/tl-PH-d42586e4-1da0-4e37-a8ac-febd7bff7bc0/tl-PH-cd07116e-1610-4789-a432-7362e040d251.m3u8"
}
};

// 🔥 Storage
const OUTPUT = path.join(process.cwd(), "streams");
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

// 🔥 Track running jobs (avoid duplicate ffmpeg)
const running = {};

// 🔥 Generate VOD (ON DEMAND)
function generateVOD(ep) {
  return new Promise((resolve) => {
    if (running[ep]) return resolve("already running");

    const stream = EPISODES[ep];
    if (!stream) return resolve("invalid");

    const dir = path.join(OUTPUT, ep);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const outputFile = path.join(dir, "index.m3u8");

    if (fs.existsSync(outputFile)) {
      return resolve("ready");
    }

    console.log(`🎬 Generating ${ep}...`);
    running[ep] = true;

    const headers =
      "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\nOrigin: https://mydramawave.com\r\n";

    const args = [
      "-headers", headers,
      "-i", stream.video,

      "-headers", headers,
      "-i", stream.audio,

      "-map", "0:v:0",
      "-map", "1:a:0",

      "-c:v", "copy",
      "-c:a", "aac",

      "-f", "hls",
      "-hls_time", "6",
      "-hls_playlist_type", "vod",
      "-hls_list_size", "0",
      "-hls_flags", "independent_segments",

      outputFile
    ];

    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stderr.on("data", (d) => {
      console.log(`[${ep}] ${d}`);
    });

    ffmpeg.on("close", (code) => {
      running[ep] = false;
      if (code === 0) {
        console.log(`✅ ${ep} DONE`);
        resolve("done");
      } else {
        console.log(`❌ ${ep} FAILED`);
        resolve("failed");
      }
    });
  });
}

// 🔥 Serve files
app.use("/vod", express.static(OUTPUT));

// 🔥 ON-DEMAND endpoint (KEY FIX)
app.get("/vod/:ep/index.m3u8", async (req, res) => {
  const ep = req.params.ep;
  const file = path.join(OUTPUT, ep, "index.m3u8");

  if (!fs.existsSync(file)) {
    console.log(`⚡ On-demand generate ${ep}`);
    await generateVOD(ep);
  }

  if (fs.existsSync(file)) {
    return res.sendFile(path.resolve(file));
  } else {
    return res.status(500).send("❌ Failed to generate stream");
  }
});

// 🔥 Playlist
app.get("/playlist.m3u", (req, res) => {
  const base = `${req.protocol}://${req.get("host")}`;
  let m3u = "#EXTM3U\n\n";

  Object.keys(EPISODES).forEach((ep, i) => {
    m3u += `#EXTINF:-1 group-title="🎬 Drama",Episode ${i + 1}\n`;
    m3u += `${base}/vod/${ep}/index.m3u8\n\n`;
  });

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3u);
});

// 🔥 Debug
app.get("/debug", (req, res) => {
  let status = {};
  Object.keys(EPISODES).forEach(ep => {
    const file = path.join(OUTPUT, ep, "index.m3u8");
    status[ep] = fs.existsSync(file) ? "READY" : "NOT READY";
  });
  res.json(status);
});

// 🔥 Root
app.get("/", (req, res) => {
  res.send("🎬 VOD Server (Render Ready)");
});

// 🔥 Start
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
