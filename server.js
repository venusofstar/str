
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/c43636c8-25e1-4cfa-ab46-e996cca26587/360_0/1_4f45b546-e7db-47a7-a37f-d874ad762606_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c43636c8-25e1-4cfa-ab46-e996cca26587/tl-PH-ce5fefd4-9cb3-4f5f-b390-3ddc96e3128a/tl-PH-c7c9da0f-5947-4bec-a035-463d5a7ac055.m3u8"
},

ep2: {
  video: "https://video-v6.mydramawave.com/vt/fbdf510d-e0cf-4b7e-848d-ec2ce2c10867/360_0/2_713e386d-8924-490c-ad34-edf6cfb50958_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/fbdf510d-e0cf-4b7e-848d-ec2ce2c10867/tl-PH-06ab91b4-92d8-4f28-b56a-f4a38543047c/tl-PH-ed889991-5aeb-41fc-80c4-bbde89ccd45a.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/ac57f15b-6d7e-421c-a5ec-7e91c92268c4/360_0/3_0a23e06c-51ab-4f96-b41a-813b04e5838e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ac57f15b-6d7e-421c-a5ec-7e91c92268c4/tl-PH-ee6eed38-9aa7-49bb-9575-9b623f8733cd/tl-PH-45da2fa6-3ec6-48b2-930a-0b8c2fed0a5b.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/da02761e-3068-41bb-815e-cc1d8bb89a96/360_0/4_a5a66c23-3733-4d72-a989-58cd7e620542_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/da02761e-3068-41bb-815e-cc1d8bb89a96/tl-PH-99fb712f-afbd-43d3-b91f-a3835208ca13/tl-PH-a5c0a7b9-dfce-4a94-836c-2cc26e9cc6be.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/3bde859b-3e05-4498-a7da-33444c734118/360_0/5_d495325a-9811-41c9-9e25-8862fa90bbf0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3bde859b-3e05-4498-a7da-33444c734118/tl-PH-acee20d6-8bd6-4e8e-a7f4-113b1ee513eb/tl-PH-491e0c1d-abbb-4740-b31a-4d675c7e489e.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/724c2ebf-32e0-4696-8935-2b5ba789d6b2/360_0/6_c82c8b3e-37ea-4715-8e8b-a0b5d2b739a9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/724c2ebf-32e0-4696-8935-2b5ba789d6b2/tl-PH-616af144-f28b-4b36-85e7-e08de77e47f6/tl-PH-874f0647-0b2f-438b-b891-4ea43ff2822c.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/d47a9e39-1bbf-40a3-b488-adb7c67905e9/360_0/7_56f342f1-e8f7-473d-9844-23e98bba1c82_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d47a9e39-1bbf-40a3-b488-adb7c67905e9/tl-PH-f0a48107-d058-483e-8c43-18cc988215ba/tl-PH-d4f69d3b-69ce-4984-8427-d6b96de6352b.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/8041b5ad-7686-4df7-9cb9-e7c68ce594a3/360_0/8_148fdc40-ef49-4b30-8591-8b5a2a3723d6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8041b5ad-7686-4df7-9cb9-e7c68ce594a3/tl-PH-b3188fae-fa1f-4354-a6fe-ec2d4566c8ec/tl-PH-b6fd2106-8188-4c8d-8ba8-cc6293a6592e.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/c9632759-f729-43b8-86d0-7dbd384be6fc/360_0/9_35aa0fda-21f5-4035-a033-c9298bd6e71c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c9632759-f729-43b8-86d0-7dbd384be6fc/tl-PH-98c91250-2398-43e4-b65a-1b6fc8f4c513/tl-PH-05f1dea6-0527-43c4-a789-a66ac01b82f1.m3u8"
},

ep10: {
  video: "https://video-v6.mydramawave.com/vt/ceca78f2-0e6d-4f28-bc5f-dc195a18bb09/360_0/10_785a1102-77c0-477e-9137-f35351217652_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ceca78f2-0e6d-4f28-bc5f-dc195a18bb09/tl-PH-9ef3170e-d0b8-496d-bf34-7475ce75e576/tl-PH-fe271a42-6090-48af-90c4-ad75e4b265bc.m3u8"
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
