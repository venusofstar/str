
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep41: {
  video: "https://video-v81.mydramawave.com/vt/867d4e73-bed2-416a-9b4b-ded7700fab1e/41_5618c489-bb2d-4d5c-9630-acb160db0fda_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/867d4e73-bed2-416a-9b4b-ded7700fab1e/tl-PH-b1cef7c6-0187-404d-8358-549839d49b6c/tl-PH-0f8c58df-a604-48c4-86f3-36df97dadfb8.m3u8"
},

ep42: {
  video: "https://video-v6.mydramawave.com/vt/df25a19f-63dd-4bac-b782-0b1bde966ae5/42_27bed714-2f6d-4ce7-950b-52894a5ead1e_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/df25a19f-63dd-4bac-b782-0b1bde966ae5/tl-PH-2d4b7da2-c889-41e5-ab2e-a2da23861a91/tl-PH-bb46a226-6acc-4026-8e24-856413184679.m3u8"
},

ep43: {
  video: "https://video-v81.mydramawave.com/vt/31e4d5a1-483f-41f4-b401-cfd006e2f512/43_1475ed1d-7565-45a2-9c5a-df6d17e6cd3f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/31e4d5a1-483f-41f4-b401-cfd006e2f512/tl-PH-8c66bfc4-6430-4934-ba84-718a58965ec9/tl-PH-0740c68f-821b-402d-909f-5ce16365de94.m3u8"
},

ep44: {
  video: "https://video-v81.mydramawave.com/vt/f4d12c8e-835c-484f-b11f-3c078d3abbbd/44_88ad3c1a-5c5d-43ee-b3a0-3d3fcda851ca_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f4d12c8e-835c-484f-b11f-3c078d3abbbd/tl-PH-943c4f58-2add-4efb-969c-556ba46c9701/tl-PH-0683063a-4b64-4d78-a96f-7bc0536e619c.m3u8"
},

ep45: {
  video: "https://video-v81.mydramawave.com/vt/5464ccd2-edde-4b4e-9e67-3565b062fc8e/45_c4cb9458-4358-428b-a487-97db8c004f4f_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/5464ccd2-edde-4b4e-9e67-3565b062fc8e/tl-PH-5eeb9385-23d1-460d-8d9b-53379d95696d/tl-PH-163c8e39-70e1-4651-839a-5349bf27ad2c.m3u8"
},

ep46: {
  video: "https://video-v6.mydramawave.com/vt/1f761872-523b-426e-ac89-faf5e08bd5fa/46_dda55993-8276-45ec-a0b4-171f7eb35053_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1f761872-523b-426e-ac89-faf5e08bd5fa/tl-PH-34cd90fc-6e5f-48a3-b11f-0f3adeb453e6/tl-PH-e0aba65d-5fd8-461e-aea5-6ef627d95b21.m3u8"
},

ep47: {
  video: "https://video-v81.mydramawave.com/vt/448f3cc7-6cf9-4e1c-bca3-ccb9c7f29ec8/47_c706f3e4-53d4-4e8e-b52d-46327e3155f0_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/448f3cc7-6cf9-4e1c-bca3-ccb9c7f29ec8/tl-PH-44e14b31-474e-4ffe-a289-ba3d678ee8bb/tl-PH-15e3c036-dffd-4e5e-bb64-c187e59d65f3.m3u8"
},

ep48: {
  video: "https://video-v81.mydramawave.com/vt/54bea385-9e3f-4003-95cd-1011dfa892f9/48_0d7ab2c8-fefd-4a2f-9194-ac5f2b03c602_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/54bea385-9e3f-4003-95cd-1011dfa892f9/tl-PH-866037f4-586d-4573-b04c-c2fb93ab4eeb/tl-PH-cdbce50a-dd3e-4e58-8fac-e8a0c501edc8.m3u8"
},

ep49: {
  video: "https://video-v81.mydramawave.com/vt/3448946f-c4cf-4b9c-85aa-4f4992f6ba99/49_833e932b-441a-4738-9c36-e9a875776d94_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3448946f-c4cf-4b9c-85aa-4f4992f6ba99/tl-PH-e1ab2278-4269-48fa-a18c-1b134fa6bcb3/tl-PH-7cccff07-49b4-476b-9617-7a1cf6177f3a.m3u8"
},

ep50: {
  video: "https://video-v81.mydramawave.com/vt/941b3989-5db2-45fc-98e2-65de6d0ff185/50_8cf0a7e9-24d7-4cef-8972-05cfe2ddd71b_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/941b3989-5db2-45fc-98e2-65de6d0ff185/tl-PH-1db73b26-8279-427c-ba60-01b3b6f2e3e7/tl-PH-c0f1d64e-04f0-48a4-9a2d-5ff2731a0ef7.m3u8"
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
