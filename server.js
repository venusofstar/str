
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep21: {
  video: "https://video-v81.mydramawave.com/vt/4dfae316-97b2-484a-88cd-660ad027636f/21_53db8007-7f86-4ba2-b7a8-ba40abd1455b_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4dfae316-97b2-484a-88cd-660ad027636f/tl-PH-aea2be4e-4118-4a54-b5f9-5787bf1be344/tl-PH-8cd3c0f4-38ed-46cc-a807-b34900ccd9a8.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/0aacf40a-9917-4b7e-a77a-76293fed1663/22_321d3fe4-1e70-4e07-b0af-620d263edcd8_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0aacf40a-9917-4b7e-a77a-76293fed1663/tl-PH-1819a9b1-8a4a-4228-8dc5-18558140d4c9/tl-PH-97eeeaed-e429-429e-bc69-a8d3e3024da7.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/7ba5fa76-9127-40e2-a239-f132544735ce/23_6b32569f-ed7f-4193-9471-befb1ebd2e09_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7ba5fa76-9127-40e2-a239-f132544735ce/tl-PH-d5e9b65d-5c10-445d-b269-8005162f3df4/tl-PH-e4f9a665-a470-4dc7-9217-041b801f6237.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/a4d439ca-a176-4e63-aa07-4135103cfdb7/24_31c4451e-57c2-4e2d-8946-1ec5526074df_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a4d439ca-a176-4e63-aa07-4135103cfdb7/tl-PH-4e30b6ac-a9e6-4143-b130-e080a1e2854a/tl-PH-16f1433e-c1a2-4188-a17a-ef83b79ee74c.m3u8"
},

ep25: {
  video: "https://video-v81.mydramawave.com/vt/5a3fac3d-0eb3-4e70-a8bf-804f44aa1004/25_ecdfa1fd-f4af-4650-b403-ad361b6fdc60_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5a3fac3d-0eb3-4e70-a8bf-804f44aa1004/tl-PH-244ea8e8-42b6-467b-b2b0-e08157178c42/tl-PH-f1091d90-b218-4b93-ab8b-423996362532.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/0deb4182-15d6-41fa-9c48-1e62b00b8d7f/26_89b3d670-f170-424f-a564-c9ea1851124e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0deb4182-15d6-41fa-9c48-1e62b00b8d7f/tl-PH-fa03e4af-0cd5-48f3-8c6d-3b77d9841fd5/tl-PH-e57a90dd-2754-4cb6-b770-99c35c6101b6.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/b3df22da-8eb3-4678-a02c-2a649ca372af/27_7c52369b-9f83-4663-be26-e7f6b9c6a930_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b3df22da-8eb3-4678-a02c-2a649ca372af/tl-PH-fedf66d6-1982-4515-aad2-04cd1aac2b66/tl-PH-c2c95148-b872-46a4-9da9-7046bca87915.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/db508aba-9471-457a-81cf-ff0a65fe5ef3/28_02e3f1d7-481b-4bfd-a4c2-90112eb67a60_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/db508aba-9471-457a-81cf-ff0a65fe5ef3/tl-PH-49c5f64f-278b-4e19-b5c1-31c6fcaabc3c/tl-PH-fdccd515-b9c1-4645-866e-4eb0cca88c45.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/b3880ee2-f9f5-49a3-9a21-8b6bc4fb8e9b/29_9f472b51-3d35-4b63-958d-c99fe2d7fe0b_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b3880ee2-f9f5-49a3-9a21-8b6bc4fb8e9b/tl-PH-f5605fd3-af39-4982-9bec-d78e3cee84bf/tl-PH-e994faa7-6173-4afe-9bd5-6767d93a2319.m3u8"
},

ep30: {
  video: "https://video-v81.mydramawave.com/vt/88f88237-3af9-4d6e-baa3-bed3d60f3526/30_e826ba0c-9931-41ba-a504-7d62d38665d4_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/88f88237-3af9-4d6e-baa3-bed3d60f3526/tl-PH-19316842-8285-41c1-8cf7-a23e00e0564c/tl-PH-270768d5-5ef5-4c22-a6a4-227476caa93f.m3u8"
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
