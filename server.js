
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep11: {
    video: "https://video-v6.mydramawave.com/vt/fc747587-a4c1-40d6-8b7e-a10882687ac5/11_06484d2f-aa70-4aca-ba2e-750188e952e2_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/fc747587-a4c1-40d6-8b7e-a10882687ac5/tl-PH-0c04669e-d25c-4f41-931a-fe2d1ea911f3/tl-PH-084b520f-e9e3-464f-9051-45df20e94b54.m3u8"
  },

  ep12: {
    video: "https://video-v81.mydramawave.com/vt/2eacd6d2-3bf0-4f58-8d44-0e4c9b94f2b1/12_84f67313-e88a-47c5-a850-5691371eaebe_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/2eacd6d2-3bf0-4f58-8d44-0e4c9b94f2b1/tl-PH-0458058d-8394-4359-a27b-7de486ce0425/tl-PH-c1df8452-1bdd-4806-9db3-527a9a0c2db2.m3u8"
  },

  ep13: {
    video: "https://video-v81.mydramawave.com/vt/39ac9e9c-5bf0-4bf9-97a3-0eaa9e5a7491/13_a024c2fd-fb2c-4a8b-9a99-7e8293e5bb61_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/39ac9e9c-5bf0-4bf9-97a3-0eaa9e5a7491/tl-PH-76868318-75b9-48d4-a2bf-89cd28b2cedb/tl-PH-0bac1eda-d6aa-4018-9276-e13e9319d64b.m3u8"
  },

  ep14: {
    video: "https://video-v6.mydramawave.com/vt/0219a240-6967-4357-9d2d-d0123fafd57b/14_f56515ce-752a-4ae0-b40a-75dea86ecc85_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/0219a240-6967-4357-9d2d-d0123fafd57b/tl-PH-b2828eda-335f-4386-b81b-12a1a92ecb44/tl-PH-ff1f69e8-b025-485c-9017-82b0652a2ddc.m3u8"
  },

  ep15: {
    video: "https://video-v6.mydramawave.com/vt/f5bbdbf5-11f5-42ac-834c-25908779fca6/15_6c7d523b-7ce4-480b-a228-1817c014255a_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/f5bbdbf5-11f5-42ac-834c-25908779fca6/tl-PH-618c320a-8c57-4576-8424-3dc3ba49bf2d/tl-PH-83b70769-e04c-40bb-b5ea-028462218d67.m3u8"
  },

  ep16: {
    video: "https://video-v81.mydramawave.com/vt/d41f0d2d-afce-4ae2-8f6e-9e488bcb444e/16_36343e07-8311-48ed-b141-6987ce644719_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/d41f0d2d-afce-4ae2-8f6e-9e488bcb444e/tl-PH-314fa2e8-66ff-46dc-9217-8119c861ca17/tl-PH-95285375-5ca0-46a1-9c6b-bb1c819cfd28.m3u8"
  },

  ep17: {
    video: "https://video-v81.mydramawave.com/vt/52449c68-3cd6-42b8-b3c7-ad1c242665ae/17_e84984a1-5c7b-4f85-b5f4-88988100b5bc_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/52449c68-3cd6-42b8-b3c7-ad1c242665ae/tl-PH-4ad5decc-97f6-4924-939f-387d9cfe0c37/tl-PH-a7c6b8da-3a88-4960-8e9b-6149ca7dc0cd.m3u8"
  },

  ep18: {
    video: "https://video-v81.mydramawave.com/vt/ed2fe6f4-197c-4120-9858-5c566f18b9a5/18_babda342-1b39-4693-a44c-c1f02eb1bfda_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/ed2fe6f4-197c-4120-9858-5c566f18b9a5/tl-PH-f6b01dad-79f9-41fb-8fd4-8edbbf5c2b60/tl-PH-6242af00-b318-4359-ad32-fa9d18ca741c.m3u8"
  },

  ep19: {
    video: "https://video-v6.mydramawave.com/vt/96c56d8a-af53-498f-8eb0-f0088ae98079/19_2ff181b2-118a-4925-9aed-e648ad5b4032_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v6.mydramawave.com/vt/96c56d8a-af53-498f-8eb0-f0088ae98079/tl-PH-482e967a-a546-4bb5-b3a4-699808f6fc1c/tl-PH-8e01b4c9-44e2-4d94-9808-ff34c7d4cb26.m3u8"
  },

  ep20: {
    video: "https://video-v81.mydramawave.com/vt/ba2295f2-7ff4-4c28-aaa5-1a83cca62633/20_07cfc2a4-78db-44cc-829f-52b948a4f043_transcode_1309546_adaptiveDynamicStreaming_1529555_4.m3u8",
    audio: "https://video-v81.mydramawave.com/vt/ba2295f2-7ff4-4c28-aaa5-1a83cca62633/tl-PH-b7046e62-62c1-4ceb-8cbd-02efef2e500b/tl-PH-8ebbae51-ff88-4f70-b8d1-7a6920b0b29d.m3u8"
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
