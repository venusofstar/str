
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep31: {
  video: "https://video-v81.mydramawave.com/vt/d80bc05e-3cce-4642-b23f-b666bbac649e/31_b52e2536-5b5a-4d4c-8d39-18d8e8cbdd08_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d80bc05e-3cce-4642-b23f-b666bbac649e/tl-PH-3a3c8fef-fb2a-4b94-bcee-861ba439edd6/tl-PH-1340d402-de78-4fa3-b39d-6dca3517c6b0.m3u8"
},

ep32: {
  video: "https://video-v81.mydramawave.com/vt/a638cfad-e856-4b96-a921-5db1b4452283/32_a3bb8b5e-98f9-4277-81c7-c8376903ce40_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a638cfad-e856-4b96-a921-5db1b4452283/tl-PH-bd064dd0-f8d7-4824-b60b-884f7fddcbd8/tl-PH-b6501742-944f-43c8-8874-01a85b7dc368.m3u8"
},

ep33: {
  video: "https://video-v6.mydramawave.com/vt/1bb35bd9-22eb-4743-bb20-1ad7b3440968/33_b3e18b4e-2f61-4b90-95af-079d7f89b56a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1bb35bd9-22eb-4743-bb20-1ad7b3440968/tl-PH-77bcb44c-5f30-4511-aa44-7eaa68cbcb29/tl-PH-e7353493-00c7-4540-9a70-84f7a316ddb9.m3u8"
},

ep34: {
  video: "https://video-v6.mydramawave.com/vt/e592007c-a10c-4dee-b880-470b70145dda/34_1646021b-a601-41f9-8a41-8412701817be_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e592007c-a10c-4dee-b880-470b70145dda/tl-PH-70ffd225-8818-487c-b491-a3ed665c9a6d/tl-PH-30bea985-4c67-4487-83bb-6cf07549236f.m3u8"
},

ep35: {
  video: "https://video-v6.mydramawave.com/vt/a51ed5dd-1bc5-4c82-88dd-6afd31b0e44a/35_bf34edda-d702-47a4-aba1-833f5d91b01f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/a51ed5dd-1bc5-4c82-88dd-6afd31b0e44a/tl-PH-3a116776-5186-4692-9b06-00a9bb7cc18a/tl-PH-b16ec85a-c8a1-4832-93ed-70313bee0c47.m3u8"
},

ep36: {
  video: "https://video-v81.mydramawave.com/vt/3683f180-1835-4130-b51a-e20e99e1df31/36_3c8a81f6-e497-4118-b298-bd679ba5bd87_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3683f180-1835-4130-b51a-e20e99e1df31/tl-PH-2e3803d4-9daa-4381-b541-819bfba0e157/tl-PH-fad0ddc6-965c-425a-96fc-0219a81a3d64.m3u8"
},

ep37: {
  video: "https://video-v81.mydramawave.com/vt/d32079d5-e3bb-420d-bdff-d86e50f697ea/37_477afc27-fc4f-4cca-b698-a07d7000948a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d32079d5-e3bb-420d-bdff-d86e50f697ea/tl-PH-4a61307c-241a-4527-9cbe-5e7c5c352657/tl-PH-0a49000d-6b80-499b-8fac-ed6b0dd99023.m3u8"
},

ep38: {
  video: "https://video-v6.mydramawave.com/vt/4a79771e-c0ca-4f61-9e92-6dbe51eedc34/38_4c8fc573-0396-48bd-9df1-2eeb197b437e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/4a79771e-c0ca-4f61-9e92-6dbe51eedc34/tl-PH-e084e8d9-887b-4992-a4c5-923d87f65bd9/tl-PH-bd8ee947-699d-4332-ab06-f677fe72829a.m3u8"
},

ep39: {
  video: "https://video-v6.mydramawave.com/vt/ed8c7556-8f28-4c92-b332-6fa98eb600c9/39_2872365e-1a38-4c01-a0af-596d838817f8_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/ed8c7556-8f28-4c92-b332-6fa98eb600c9/tl-PH-67d0d56b-066d-435c-97e4-d963274dcff0/tl-PH-a0a6f739-96a9-40bb-b709-835479187c9e.m3u8"
},

ep40: {
  video: "https://video-v6.mydramawave.com/vt/03242840-9502-4493-937e-717035c2716a/40_580191d0-b5f5-4fb7-a9b4-8c7e153bed4f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/03242840-9502-4493-937e-717035c2716a/tl-PH-3716e8d2-d3b7-4518-8fc0-5cc33744a36b/tl-PH-d9537178-1911-4756-ba5f-13ac676b7ad3.m3u8"
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
