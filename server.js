import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/e898047d-5e01-41d4-9ece-5d25b5e6864d/360_0/1_c8f58f3d-f370-4411-b4f5-83cc5113e4cd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e898047d-5e01-41d4-9ece-5d25b5e6864d/tl-PH-0e0006dc-8aa9-4f0d-9330-aefe9afffdff/tl-PH-2040e1f3-6b26-4bae-b0f9-b450152ab497.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/816bc979-2f26-4dfa-9e0c-e63400b15237/360_0/2_bbce60a3-4fc5-469b-bc67-2273d0e4a9e6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/816bc979-2f26-4dfa-9e0c-e63400b15237/tl-PH-e17ee626-e987-476f-abf8-ed71c990a7ac/tl-PH-2a290138-49a7-406b-8a37-3fb3e05a1262.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/422e7d00-fcce-4f08-863e-1f0b32f86ab7/360_0/3_a04e67a9-8fa8-4ce5-a778-1a3d1bb73dc4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/422e7d00-fcce-4f08-863e-1f0b32f86ab7/tl-PH-d05c09d0-8338-463a-9e14-61c447d1a932/tl-PH-03e92f51-ae11-4b03-95d2-36137587a55a.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/0a9bc299-8d42-4f6a-8916-ac05607cbe30/360_0/4_041880c3-6249-4a29-b1f2-86a1f4d5e7e2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0a9bc299-8d42-4f6a-8916-ac05607cbe30/tl-PH-b8b86fdd-0afe-4eda-a9f4-2fd2dfd5b99a/tl-PH-453dbe4a-b7ab-4d5d-976f-4f136def268f.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/a2291d56-257d-4328-b429-e6eb011f7797/360_0/5_2b7a7f1e-5073-466f-ac0e-8dbf715be59a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a2291d56-257d-4328-b429-e6eb011f7797/tl-PH-e0cf2770-4107-47ac-b3be-b5d80244193b/tl-PH-26e9fc9a-6aaf-40f8-addf-aad55ac6220b.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/b00bbb1f-70a1-4174-86d9-c97b6d3961ce/360_0/6_d4689c07-ec42-4e5c-9876-a9780ed29fc5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/b00bbb1f-70a1-4174-86d9-c97b6d3961ce/tl-PH-2f087d50-ed86-4561-96e2-a77746a8ec2d/tl-PH-82134935-ba3d-4b9d-a22f-ced8585f5261.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/6e3b03a7-fd6d-4ca9-ad87-bfc4b455588d/360_0/7_c691d78a-4db8-4044-af47-0befda3ba2b7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6e3b03a7-fd6d-4ca9-ad87-bfc4b455588d/tl-PH-a0756b9f-19e2-4161-b882-02ff45353694/tl-PH-aeb4cfaa-707f-4f13-9cb6-0de95385f492.m3u8"
},

ep8: {
  video: "https://video-v81.mydramawave.com/vt/805409e2-e1e2-40e9-a6ae-9668565fba0a/360_0/8_1568eed1-e31b-4631-a437-1d25c14ac063_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/805409e2-e1e2-40e9-a6ae-9668565fba0a/tl-PH-f9c14269-206e-492e-a134-ac5fca27b60d/tl-PH-c15e3309-3d8e-404e-b46e-f6fe2c3af97a.m3u8"
},

ep9: {
  video: "https://video-v81.mydramawave.com/vt/ea52c951-10e1-444a-a53e-bfb3bbc7b8d9/360_0/9_5e1f0c92-6151-4e36-aac6-c176ef845743_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/ea52c951-10e1-444a-a53e-bfb3bbc7b8d9/tl-PH-cff7e0a7-daf2-4db8-8ef6-0396aac230bb/tl-PH-75a6afc2-f6c7-4b04-9e5a-1d083a0fb17f.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/be285568-2c4a-4964-95e3-cf32531679f4/360_0/10_02998cd7-137c-4f06-86ac-e899888e3148_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/be285568-2c4a-4964-95e3-cf32531679f4/tl-PH-0761cc54-5205-4b0b-8d88-12a4e81862fd/tl-PH-744b8643-68c1-4857-a943-8552f6e1daf2.m3u8"
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
