
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep11: {
  video: "https://video-v6.mydramawave.com/vt/32840219-a58a-45d7-aa31-690b115bade1/360_0/11_017c959d-92b1-4c7e-8d9b-b989385481cd_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/32840219-a58a-45d7-aa31-690b115bade1/tl-PH-aff0ffe9-1ccd-448c-ba62-071733901540/tl-PH-8f88c98d-0631-4e8c-b574-cd7f4695b114.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/0555e6b7-db65-49f4-8d24-e8f438c9cf3e/360_0/12_7de19d0c-a40a-4ba7-9fda-f94cfb27183d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0555e6b7-db65-49f4-8d24-e8f438c9cf3e/tl-PH-2db04862-d8c7-4675-a7ae-e599939b5310/tl-PH-7f65bc90-95c5-491c-8929-c330f40f15e7.m3u8"
},

ep13: {
  video: "https://video-v81.mydramawave.com/vt/823872ae-84b3-498e-b920-15244218a662/360_0/13_7837e88a-f5df-4cc0-9c83-ddfb7c5031da_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/823872ae-84b3-498e-b920-15244218a662/tl-PH-b3b40bdf-30bf-40c2-87de-401f9cba5ce4/tl-PH-9972fbe9-861a-455e-8d7f-b4ef5e534008.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/9829c67d-5649-41ff-9be2-543ce2e6f884/360_0/14_22254d24-5d5e-4106-bf1f-2fd18549f317_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9829c67d-5649-41ff-9be2-543ce2e6f884/tl-PH-1fcec702-fd2c-4b29-8ef7-de751538bb82/tl-PH-d1123bdb-c2e2-4fa2-bfd6-70aca4e0f3df.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/81dc3008-9d82-45cc-8628-4b6260233ed5/360_0/15_716d31c7-9f54-4e5a-9afc-0d48a09cc179_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/81dc3008-9d82-45cc-8628-4b6260233ed5/tl-PH-ef0128cd-52d9-4b88-8ff4-6b24f5b56135/tl-PH-ae101ddd-542f-4c6c-b76a-8c0e06777089.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/a14f0493-1292-4296-b192-44ad4f818e3b/360_0/16_d0402857-2bc9-42e8-aee7-a01fb40cc4e1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a14f0493-1292-4296-b192-44ad4f818e3b/tl-PH-7844078e-6a7a-40ac-92ae-a8e829a10f4a/tl-PH-e7c39a22-dfed-4c85-816e-950334f14e2b.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/2ed443f7-ca39-4f3f-bed5-423f9d09107b/360_0/17_febd238c-be97-4ad2-9d76-9697312dc2a7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/2ed443f7-ca39-4f3f-bed5-423f9d09107b/tl-PH-41636f2c-ae7a-4e43-ba60-ba0fbf53e541/tl-PH-47422bd4-894a-4ceb-a219-f0f45c1bf62f.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/c3d8dc45-f3b2-4d1f-97d2-9929b16f5c7b/360_0/18_84215513-05eb-439b-a99b-17a264fd0996_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c3d8dc45-f3b2-4d1f-97d2-9929b16f5c7b/tl-PH-6f830ee2-c112-4292-bb13-e0470f07766c/tl-PH-c433d81e-284e-4171-920a-353793920d2d.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/b9833540-7c92-4d57-b073-9a18b47aaa32/360_0/19_f1289f24-9f85-42ae-9d30-010ed7aafde8_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b9833540-7c92-4d57-b073-9a18b47aaa32/tl-PH-e1ba99ee-79ad-4b76-984c-4cd54dbe75a1/tl-PH-debe79b5-1da8-4e1f-82b3-ed97ef52cedb.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/3bfca47d-5ce7-4d9c-874a-2216d340006d/360_0/20_5fb032e6-8d19-4793-8dbd-b80a35878b75_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3bfca47d-5ce7-4d9c-874a-2216d340006d/tl-PH-92f4de61-aca4-44c2-8004-7b5b6e0dc179/tl-PH-77fa6119-619a-4df3-a68a-584b9ebb2fd3.m3u8"
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
