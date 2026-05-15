import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v6.mydramawave.com/vt/78322b41-5587-45cc-b1c6-7f3e6a34fd96/360_0/1_e99a29ec-c7d4-44f8-8564-537d6940b5ce_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/78322b41-5587-45cc-b1c6-7f3e6a34fd96/tl-PH-490ce371-4d8d-44f1-88b9-4cbeb18bb075/tl-PH-696965a2-d9d2-498b-85a7-dbf282e4ac65.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/17547663-dbdd-4de3-96e8-ad27a1b4ba24/360_0/2_0a6cd7b2-0b32-4168-a489-e67de120dd1d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/17547663-dbdd-4de3-96e8-ad27a1b4ba24/tl-PH-b9c8074f-7872-49bd-9fd4-4b4238ac1a1c/tl-PH-0c782f4c-9a03-421c-b7ea-a21086568315.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/32ba542b-c7e5-43ea-a1cd-ace71c49b9eb/360_0/3_4ad4a406-8c90-4672-bff2-92bce19e90ae_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/32ba542b-c7e5-43ea-a1cd-ace71c49b9eb/tl-PH-f6be904f-9cfb-414e-b99c-fde24342abad/tl-PH-6bb78793-50e1-4490-9232-d404caf81bc0.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/e0337517-8b7d-401b-bbb9-0fae4f00cb50/360_0/4_577b329d-564c-453d-9450-ac2cc044c232_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e0337517-8b7d-401b-bbb9-0fae4f00cb50/tl-PH-abc43230-a7d5-46d9-b7d6-525399ab803a/tl-PH-5c765c18-369a-443a-aa1e-7211d824a765.m3u8"
},

ep5: {
  video: "https://video-v6.mydramawave.com/vt/f512f003-a612-4a24-96e3-17fb2c6129eb/360_0/5_8798866b-9e38-4b2f-b842-b745d1ea5244_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f512f003-a612-4a24-96e3-17fb2c6129eb/tl-PH-56920c9c-1fea-463c-b4b5-8da4e012857e/tl-PH-43133d57-00a2-4510-84d0-c990dc7270a9.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/6732f91e-bedc-494d-895b-6a4897317142/360_0/6_ca155434-84fc-4a31-8f9b-7a04be111c80_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6732f91e-bedc-494d-895b-6a4897317142/tl-PH-e6e41561-7047-42a9-9673-768381f7585f/tl-PH-1ac4fa3a-3ecb-44e9-a242-96ad9510da6b.m3u8"
},

ep7: {
  video: "https://video-v81.mydramawave.com/vt/c5efbc3d-c657-4a9c-88dd-dbfeabd27149/360_0/7_5993633e-e494-4b14-a277-10e07c80094b_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c5efbc3d-c657-4a9c-88dd-dbfeabd27149/tl-PH-dd0d43ad-7d76-4bb4-a073-3a0e02cd5da2/tl-PH-d6b3c7d7-4eda-461c-818a-94da5f31c59e.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/af27ad1a-de01-46ec-a7ff-764f2205b50a/360_0/8_7c914502-093a-4d1f-9545-40b94dc6aebf_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/af27ad1a-de01-46ec-a7ff-764f2205b50a/tl-PH-f16abb04-0e37-4c4d-8401-58761a3efd12/tl-PH-689b3f92-154c-4270-9489-68bc5df8f884.m3u8"
},

ep9: {
  video: "https://video-v81.mydramawave.com/vt/12c531de-3bf0-4199-af52-f75f92effcc3/360_0/9_9dbe250b-82be-4393-a39c-ee8e89b93392_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/12c531de-3bf0-4199-af52-f75f92effcc3/tl-PH-fc93030e-e970-4394-b60c-9900b35c2b48/tl-PH-72ba8da1-21bc-4529-bd25-118e2b5d22ec.m3u8"
},

ep10: {
  video: "https://video-v6.mydramawave.com/vt/1c2e13a2-a4f4-440c-aab9-08a94cade5c8/360_0/10_32c6b895-b98b-4a07-987d-8e803a3e1c98_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1c2e13a2-a4f4-440c-aab9-08a94cade5c8/tl-PH-752a4da0-5357-41ad-a5ce-9d39c59b0622/tl-PH-929052b8-655a-47db-8d05-7727cd6c7eb1.m3u8"
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
