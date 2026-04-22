
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/6cad192b-d8d6-42b7-926e-e0b3634adfbf/360_0/89b35ab4-a510-43a9-9a21-ec0240012b79_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6cad192b-d8d6-42b7-926e-e0b3634adfbf/tl-PH-ab23feaa-4c0e-4880-bee1-832627ccf3f6/tl-PH-e027a7be-807f-48ea-b555-a34e9705f0dc.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/c934ba3c-390c-4046-9374-ab37b251b52d/360_0/ee65beee-195e-41e5-be7d-fa8e6ed2ab8b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c934ba3c-390c-4046-9374-ab37b251b52d/tl-PH-e6b9bd53-0f31-4496-8b4d-3d6d6fcc971a/tl-PH-105f1c17-6eca-45f8-8d4f-40998b98a472.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/85e99379-8929-49bd-8f8a-f2f2ce6f7f11/360_0/c6fef719-4831-4b19-98e5-7f4727b9cdd1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/85e99379-8929-49bd-8f8a-f2f2ce6f7f11/tl-PH-0f8a6e26-15f7-46aa-879f-0aafae76595e/tl-PH-f6819c41-8950-4e9b-a809-f39f62d64417.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/e0eb23f3-b311-4daf-b4b0-ecd6b91deea2/360_0/2067baea-ff8f-47b7-8a5f-e25d2b7958f9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e0eb23f3-b311-4daf-b4b0-ecd6b91deea2/tl-PH-709656fe-e53b-4de0-ad07-782a3f008e27/tl-PH-99ec166d-904b-4bb3-94aa-358dda473bbe.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/6237f4f2-12f6-4491-9da3-8412e2294495/360_0/69663fc2-ea67-4102-8114-698c5a3db4db_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6237f4f2-12f6-4491-9da3-8412e2294495/tl-PH-ba125e11-de96-443f-8b10-d1d2be5a522e/tl-PH-e4957247-e14b-4ea4-b527-dbf6945a6a68.m3u8"
},

ep6: {
  video: "https://video-v6.mydramawave.com/vt/3512cea9-6e37-41b5-9455-15de595ae982/360_0/5d1b6850-8715-447e-8f5f-90829737a205_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/3512cea9-6e37-41b5-9455-15de595ae982/tl-PH-6577393e-7980-4910-8fc6-0dcdc83b5550/tl-PH-f29d0f83-bfdf-41f7-9222-86256cf44775.m3u8"
},

ep7: {
  video: "https://video-v6.mydramawave.com/vt/38c4b425-cc0e-4779-b8ec-cba1bf08353b/360_0/9ab05ab4-f02a-4c70-b4a4-dd67038cfbb5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/38c4b425-cc0e-4779-b8ec-cba1bf08353b/tl-PH-17a56b64-e450-40a0-afbd-ba743b6b52fb/tl-PH-1a61662c-ee1a-4ab9-acd6-74ccd1017853.m3u8"
},

  ep8: {
  video: "https://video-v81.mydramawave.com/vt/83ed0759-aae7-454e-9fc6-d18b4511360e/360_0/f861c027-0387-4a56-b2d6-59e537d433ea_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/83ed0759-aae7-454e-9fc6-d18b4511360e/tl-PH-efd201e6-fbe1-4538-9b5e-675d92649cc0/tl-PH-b6cf2d9f-7ea5-48cd-b45d-a826f67c44a9.m3u8"
},
  
ep9: {
  video: "https://video-v6.mydramawave.com/vt/232fdbdd-1be1-4128-80a1-9668063449f5/360_0/1b8d4ff3-8123-49f3-9bee-aac92ac8516c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/232fdbdd-1be1-4128-80a1-9668063449f5/tl-PH-1d732b6c-66b9-4a15-aa93-8f9bd4f65c5f/tl-PH-47699bcd-8c82-49df-8e7e-b86c67f8c75d.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/32fec9bc-26ab-4cd9-89af-b9984cb1c5c0/360_0/726421c2-9b44-43bf-832d-a7df1fda146e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/32fec9bc-26ab-4cd9-89af-b9984cb1c5c0/tl-PH-392d1553-cb44-4193-85f4-08d604acb509/tl-PH-3f830193-ed28-43be-8c20-4a386b597181.m3u8"
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
