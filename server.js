
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep51: {
  video: "https://video-v6.mydramawave.com/vt/934a6f51-f886-4be3-963f-bd9c1a969d83/51_50d083e5-b996-4975-a310-1eef8834e512_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/934a6f51-f886-4be3-963f-bd9c1a969d83/tl-PH-68d7cda9-3e79-4912-8a85-83efeac9e232/tl-PH-349b4a4e-ed58-4480-9e6e-fbb6cb8fb4fb.m3u8"
},

ep52: {
  video: "https://video-v81.mydramawave.com/vt/a1e7cd1c-d4e6-4ffc-bfe2-f47b0b896546/52_14c2d37d-1844-4fda-9e59-04c2b0ca6355_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a1e7cd1c-d4e6-4ffc-bfe2-f47b0b896546/tl-PH-dc71b5da-64fb-475a-bff3-ed2f56ed09de/tl-PH-47cb56cd-572b-4cb3-81b9-73c3dcc45baf.m3u8"
},

ep53: {
  video: "https://video-v6.mydramawave.com/vt/cbdab0e9-5153-4ba9-8ceb-bb6824da69cc/53_e801ec7d-8727-42af-ba9f-222432d85967_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/cbdab0e9-5153-4ba9-8ceb-bb6824da69cc/tl-PH-c3996127-20f8-4b02-a410-94415894e829/tl-PH-48d68b85-fdd2-4c53-96cb-931419c26403.m3u8"
},

ep54: {
  video: "https://video-v6.mydramawave.com/vt/ad0380a8-4682-466a-9f7f-780ca2402c22/54_d831ea1a-0ce9-46ca-9654-5ce5661fc5cf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ad0380a8-4682-466a-9f7f-780ca2402c22/tl-PH-7572482a-b2de-4697-8d63-0d37b4670ba1/tl-PH-2871a839-43f4-4d4b-80c6-db0b05266ed7.m3u8"
},

ep55: {
  video: "https://video-v6.mydramawave.com/vt/f9722c4a-1227-4d9d-baee-0c9f4cca4f48/55_d06fb163-e257-41f9-ac36-d1fc2243af77_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f9722c4a-1227-4d9d-baee-0c9f4cca4f48/tl-PH-69e3eefe-37a3-4214-950b-6874b26053b8/tl-PH-c6363b67-f3d8-4bfb-a596-5a191dd2919a.m3u8"
},

ep56: {
  video: "https://video-v81.mydramawave.com/vt/669b10dd-4e28-4c78-beab-a7cf6ebcac75/56_e66f2f7c-782f-4b20-9c71-eab401aacae1_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/669b10dd-4e28-4c78-beab-a7cf6ebcac75/tl-PH-f3228fa0-3932-4bb4-a00c-6ef3be59e9a9/tl-PH-07fc02d8-67bc-4f80-bfeb-f44f398aa8f2.m3u8"
},

ep57: {
  video: "https://video-v6.mydramawave.com/vt/ac783d93-9f57-4fc2-acdd-fda325d4fea7/57_bb13e2fa-2319-4892-87b2-baeb84dde132_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ac783d93-9f57-4fc2-acdd-fda325d4fea7/tl-PH-39f67315-784b-465e-9c3e-8dd9d4df242f/tl-PH-a2dff4e9-d20d-488e-867b-884d0ff92735.m3u8"
},

ep58: {
  video: "https://video-v81.mydramawave.com/vt/9d188723-e0ce-477a-9ea9-f0cca057d7ca/58_56e8d804-6615-475e-b5dc-5fa2f74e5f1c_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9d188723-e0ce-477a-9ea9-f0cca057d7ca/tl-PH-21a5fe21-4717-464d-83e5-3da940a90e26/tl-PH-f4cc4485-e77f-4cb7-8b5d-67fec3a92a4a.m3u8"
},

ep59: {
  video: "https://video-v6.mydramawave.com/vt/f99b688d-9491-436d-82d2-aa2bbea00c64/59_82a0caaf-5d9e-47ab-8b6b-cb818e6572b5_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f99b688d-9491-436d-82d2-aa2bbea00c64/tl-PH-51882d99-edab-45f8-ad85-2e1a5b849bcc/tl-PH-aff74e1d-c512-437d-ab4b-b762a6dbabb6.m3u8"
},

ep60: {
  video: "https://video-v81.mydramawave.com/vt/4acf1bd9-3fb8-40bf-98d5-8eda8947437e/60_1c32eec2-0c3e-4132-a372-969588e8b98e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4acf1bd9-3fb8-40bf-98d5-8eda8947437e/tl-PH-56f9c875-6ece-4914-86b0-e273f1460e8f/tl-PH-293a4cb3-fa60-47fc-833d-094b06ec6834.m3u8"
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
