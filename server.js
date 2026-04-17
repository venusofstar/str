
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep21: {
  video: "https://video-v81.mydramawave.com/vt/26db5e43-4f4d-4696-a905-ce383ffe300f/360_0/21_bf4aa20b-73e4-4300-88f4-0bc1c7687f9e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/26db5e43-4f4d-4696-a905-ce383ffe300f/tl-PH-2d520348-d8c2-4f9f-a9c0-194589bd2fd1/tl-PH-05c3b68a-437e-43b2-a41d-38a6ba99d5a0.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/30e7047c-d5a2-496c-a9d2-a87b81b34c94/360_0/22_97f2fe63-f18e-4ee4-b8c1-99fbac342d26_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30e7047c-d5a2-496c-a9d2-a87b81b34c94/tl-PH-4a7c7d91-9983-4283-88cb-291a797a6f98/tl-PH-6c9ba050-173c-4dfc-bf87-9abd7110d1a7.m3u8"
},

ep23: {
  video: "https://video-v81.mydramawave.com/vt/0d537fc8-bb80-4041-8d10-d0023a7421b8/360_0/23_e24ce3bf-32c5-493e-9516-36b66b9a5cc2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/0d537fc8-bb80-4041-8d10-d0023a7421b8/tl-PH-373a44f2-d439-4b82-a752-a17c7ca7ddf4/tl-PH-5504de2e-2be3-44e9-9802-eda135dd231d.m3u8"
},

ep24: {
  video: "https://video-v6.mydramawave.com/vt/b084adb1-e40e-4218-87d3-c3520373ec9b/360_0/24_76a35f80-e758-4987-87dc-2f6ec17a2481_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b084adb1-e40e-4218-87d3-c3520373ec9b/tl-PH-f0c4e425-d946-4a6d-a2ba-b7a061f79cd3/tl-PH-173aa334-7f2c-48ff-8e06-96c3cb84ff2d.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/5e341400-1b31-491e-b855-4bbd8890a55f/360_0/25_44599aff-98ba-42f2-b629-ea753861b33a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/5e341400-1b31-491e-b855-4bbd8890a55f/tl-PH-cc03c988-dca7-4dba-aea2-81e671d2b8cd/tl-PH-58d87bff-20fe-44bd-bd90-26709a15ad20.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/9b552cad-bcfa-4559-b4d4-b49dca4f0926/360_0/26_ec4807e8-3fe5-43e3-af5c-33ddf6db7e83_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9b552cad-bcfa-4559-b4d4-b49dca4f0926/tl-PH-387d989c-38cd-4d87-a5af-0ed625697749/tl-PH-d13e8177-17f0-4a63-958d-4b4894336617.m3u8"
},

ep27: {
  video: "https://video-v81.mydramawave.com/vt/8cd94393-530b-491f-af2d-e0c19198431a/360_0/27_5b349427-4fc3-47e0-816a-9f3f81620aae_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8cd94393-530b-491f-af2d-e0c19198431a/tl-PH-313c440a-21d9-4604-a094-a9f57f80c26f/tl-PH-d8f5269d-f33d-48fd-aef3-f81e61a50e29.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/06a8e619-e16f-41d6-988e-65e33dec6c9f/360_0/28_5388e4c7-6aeb-4c2f-849c-e7004bed50e0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/06a8e619-e16f-41d6-988e-65e33dec6c9f/tl-PH-f1369351-66ac-4dd2-bef5-39a6ead38f9c/tl-PH-962a607a-030e-4bd8-b844-cef90e685c31.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/395e1b47-e610-444b-adc3-413058873cae/360_0/29_2891b893-3e65-4042-a507-c6cf92d3b363_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/395e1b47-e610-444b-adc3-413058873cae/tl-PH-eaca9027-3081-409e-a63e-9cf4e855eff9/tl-PH-9c5a0d18-c82f-4ee0-8bea-c0b8976ea91b.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/8ea2b85e-fc7f-4edc-ae8c-d750aaf780ca/360_0/30_30255fb6-bf9d-4b8d-aae7-3e43a05fc4d3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8ea2b85e-fc7f-4edc-ae8c-d750aaf780ca/tl-PH-35d24a12-729c-40a6-969b-4e677f30f061/tl-PH-09daa9d0-2b28-4f6c-b3a8-11c2fd213473.m3u8"
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
