
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
  ep1: {
    video: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/1_417e78f3-50b1-4bf6-bc2e-9d5bc3801084_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/cef4ab6a-f5d0-42be-87ca-583cadf17fba/tl-PH-b8ae2967-1d56-4b87-9fb2-552bfec75372/tl-PH-9d84fad4-f7de-4b02-bbb8-a7b6dac8ae79.m3u8"
  },
  ep2: {
    video: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/2_bdd85527-14cb-4f9e-8302-ca9c4ae038ae_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/560d2369-cbb9-4d2a-bd0d-315391b5323e/tl-PH-d5043ad9-7190-4b23-b9c7-5e8d46a4e678/tl-PH-d307e6e0-87e9-4413-863e-9da4b0d487f1.m3u8"
  },
  ep3: {
    video: "https://video-v81.mydramawave.com/vt/ae45f998-6367-4ea4-8941-df7982c799df/3_cb4ff659-3673-4c7d-b638-a066b9af6f41_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/ae45f998-6367-4ea4-8941-df7982c799df/tl-PH-3e9efe94-b028-444a-9552-461e697e907d/tl-PH-105c4380-e595-47c4-9634-98d770800ac6.m3u8"
  },
  ep4: {
    video: "https://video-v6.mydramawave.com/vt/e39cb817-e743-4743-8da5-c9e67c399ac9/4_6f574aa9-88df-4093-9ac9-cd5c22bc131d_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/e39cb817-e743-4743-8da5-c9e67c399ac9/tl-PH-36641927-8867-4ba9-9813-eebb606a5d6f/tl-PH-aa5b8a02-2d24-4722-8755-c0df8db1743e.m3u8"
  },
  ep5: {
    video: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/7_b3402287-e086-4f5e-9dd2-a7daf5aecfcf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/tl-PH-b1651951-3671-4c05-af1e-cfdf21fe02ad/tl-PH-3cd96374-26fc-426a-9e2f-8071927c2a61.m3u8"
  },
  ep6: {
    video: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/6_9c9b1601-0390-4019-a3ec-7106be4852fa_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/11c1e24c-ba69-45d7-8fec-d868a021263d/tl-PH-71cc7843-8a04-4be8-86ff-3480dc732d40/tl-PH-fdf36565-801c-437d-a277-ab2476624690.m3u8"
  },
  ep7: {
    video: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/7_b3402287-e086-4f5e-9dd2-a7daf5aecfcf_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/1a9514ac-48f1-4f72-9e7b-567736833131/tl-PH-b1651951-3671-4c05-af1e-cfdf21fe02ad/tl-PH-3cd96374-26fc-426a-9e2f-8071927c2a61.m3u8"
  },
  ep8: {
    video: "https://video-v6.mydramawave.com/vt/494fbeac-f4be-4383-aa64-bab3cf861340/8_df98df98-6b44-4e49-884f-4fdd2fd556f8_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/494fbeac-f4be-4383-aa64-bab3cf861340/tl-PH-c61ab8c6-3709-4416-a029-d48a11d7b830/tl-PH-fa52ab35-5cc0-4cc1-bdc0-d86fbdffa596.m3u8"
  },
  ep9: {
    video: "https://video-v6.mydramawave.com/vt/4536561d-7387-44e8-92a9-1e55500207e9/9_e5eb5def-30d7-47cb-87cc-3334a4f4e99e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/4536561d-7387-44e8-92a9-1e55500207e9/tl-PH-4dd478f8-aae6-4e94-a568-ec7e6bc380fb/tl-PH-9e625ff4-8961-4960-bdcb-3244e3b6cb7f.m3u8"
  },
  ep10: {
    video: "https://video-v6.mydramawave.com/vt/88d50ed0-e31d-4759-aa17-0c4d83013504/10_041a0aff-f60e-42ae-8a4a-657e5081fb08_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/88d50ed0-e31d-4759-aa17-0c4d83013504/tl-PH-7d4842ac-620a-4279-8f78-c95ae0ed73a8/tl-PH-9b38e732-5b68-4a18-868c-a505ace4b942.m3u8"
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
