
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
  ep1: {
    video: "https://video-v81.mydramawave.com/vt/334f4117-3869-4754-949f-4cebd2087348/360_0/1_fcc9762c-eab0-4d67-83de-bc7ce5a6a36e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/334f4117-3869-4754-949f-4cebd2087348/tl-PH-098e71a8-5fd4-405a-99cb-c370b0af4fc4/tl-PH-53abe9f3-8524-4807-979b-6a76212d76bb.m3u8"
  },

  ep2: {
    video: "https://video-v81.mydramawave.com/vt/5182ede8-cdb8-45b6-bc97-1a4b5641b6b4/360_0/2_26f4d9a2-a48c-422f-8d67-c3cb73c73959_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/5182ede8-cdb8-45b6-bc97-1a4b5641b6b4/tl-PH-d3b0f80b-1098-401d-8df4-261da545603c/tl-PH-dde7ee2a-8446-4e29-96af-187ad58f362e.m3u8"
  },

  ep3: {
    video: "https://video-v6.mydramawave.com/vt/86023032-3dbb-4ca6-8a0f-b988ebae6255/360_0/3_3b1bed75-981d-438b-87cc-801ee286d838_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/86023032-3dbb-4ca6-8a0f-b988ebae6255/tl-PH-fcd2dab7-73b1-4417-9060-dbfbee528008/tl-PH-22e2f9d5-fec9-4f6e-9b4f-43d3ec0f1570.m3u8"
  },

  ep4: {
    video: "https://video-v81.mydramawave.com/vt/3317e6d0-13d1-4040-8d4d-e8236dd3028c/360_0/4_98166343-2889-4c06-9a20-4f8816645870_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/3317e6d0-13d1-4040-8d4d-e8236dd3028c/tl-PH-812dbc80-03cd-46c8-a4ca-7b72356b62d1/tl-PH-ba72f160-c1d8-4e60-863f-79f673cf28c4.m3u8"
  },

  ep5: {
    video: "https://video-v6.mydramawave.com/vt/a3a18ee5-815d-4bea-9f4c-99b99046d41a/360_0/5_f76d4d98-d213-4ecb-bdc6-48905e0ad121_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/a3a18ee5-815d-4bea-9f4c-99b99046d41a/tl-PH-6b5e1e82-1f4a-4143-a4b6-60e593832569/tl-PH-171932c3-6d67-4a52-8d19-e9840114b73b.m3u8"
  },

  ep6: {
    video: "https://video-v81.mydramawave.com/vt/54ce02a4-5cef-4f90-b1bb-fefcc7e4cd79/360_0/6_de3d875b-a938-48d3-86d9-51c89d2e3665_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/54ce02a4-5cef-4f90-b1bb-fefcc7e4cd79/tl-PH-f2a11e92-d68f-4f59-9ddf-7dc921399261/tl-PH-f556c546-207d-4df4-adda-67a7ed52afae.m3u8"
  },

  ep7: {
    video: "https://video-v81.mydramawave.com/vt/6593f601-1f74-47ae-afe0-bd847af41c6d/360_0/7_41988197-0895-479c-a023-2a3392e0ad41_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/6593f601-1f74-47ae-afe0-bd847af41c6d/tl-PH-9fc98735-e470-4e2b-a32c-553e2f68dc5f/tl-PH-2dfee8f3-967c-49ae-934a-24210c3f8bf7.m3u8"
  },

  ep8: {
    video: "https://video-v6.mydramawave.com/vt/fdb45e8f-b08a-4466-8d01-852336f4caa2/360_0/8_f50f2437-153c-4f6c-8f5b-9e41613b4b13_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/fdb45e8f-b08a-4466-8d01-852336f4caa2/tl-PH-fc705231-35cf-4dce-9d37-76f3a30eb13b/tl-PH-6cc49ac7-de9f-4377-b0b2-4849d1181232.m3u8"
  },

  ep9: {
    video: "https://video-v81.mydramawave.com/vt/c016b117-70fa-4f9b-9460-cf9e758ed666/360_0/9_61c7a639-8830-49bd-80ab-7c7eea04ca5c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/c016b117-70fa-4f9b-9460-cf9e758ed666/tl-PH-a4a17099-e452-478f-80f8-0e542a489a96/tl-PH-9e05d252-763c-49fd-b3a0-d42e38817091.m3u8"
  },

  ep10: {
    video: "https://video-v6.mydramawave.com/vt/eba57326-bd9f-4d7e-9980-ad8cf848a4c5/360_0/10_db07b5af-0645-45fc-88be-78ff0b36423c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/eba57326-bd9f-4d7e-9980-ad8cf848a4c5/tl-PH-10247766-6694-47ba-ab73-5a321551d8a9/tl-PH-5743a6a3-3952-44b5-8acc-f67f34dd201f.m3u8"
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
