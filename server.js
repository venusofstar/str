
import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v6.mydramawave.com/vt/08489913-3db8-4803-bb14-d371643d84fd/360_0/1_413226eb-298f-4686-b8c4-21fc856fd902_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/08489913-3db8-4803-bb14-d371643d84fd/tl-PH-764f533f-c739-4e43-a66d-68f1b5bbdf47/tl-PH-71075c27-fc6b-4add-b3d2-dfdd35a70065.m3u8"
},

ep2: {
  video: "https://video-v6.mydramawave.com/vt/597beef8-dee2-4bd2-9471-c6a54e99021e/360_0/2_7adcfa76-7cca-48ee-a653-6fc21ee4ef3a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/597beef8-dee2-4bd2-9471-c6a54e99021e/tl-PH-39e2fb1f-9d55-46b4-b0f9-538cd648140b/tl-PH-a0da0911-d81c-42ff-995c-b4583bc7f39d.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/13d6cfa5-4446-4bb4-84c3-435f54152c03/360_0/3_7e426283-bec2-4698-9b09-b54e2bd283a3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/13d6cfa5-4446-4bb4-84c3-435f54152c03/tl-PH-07689a57-b694-46c5-a322-99df0582b5eb/tl-PH-03e062f3-7617-4584-ad99-256d6d9d2de2.m3u8"
},

ep4: {
  video: "https://video-v6.mydramawave.com/vt/bb5f13b5-b0aa-4903-a3d8-6a6b5cea27a0/360_0/4_85b6cf6c-121f-4338-8b32-14d295ef1676_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/bb5f13b5-b0aa-4903-a3d8-6a6b5cea27a0/tl-PH-5f13b487-d28c-456b-b6c4-5eb6904473c3/tl-PH-10d08109-0d73-4411-93e9-cf5fd931a2fa.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/4b851c0a-b608-449a-9968-c65512b77da9/360_0/5_f4694713-dfd1-49a6-9ef8-5e22afa42005_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4b851c0a-b608-449a-9968-c65512b77da9/tl-PH-fbd86675-b0e5-409f-9cf7-70a83c68bbe0/tl-PH-31ba5a7b-4ce6-4f10-9d3a-9688027f0763.m3u8"
},

ep6: {
  video: "https://video-v81.mydramawave.com/vt/dcba04f1-31e0-4681-a54c-2d782385baa3/360_0/6_80476894-8248-4521-8c80-b16638899dd2_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/dcba04f1-31e0-4681-a54c-2d782385baa3/tl-PH-102db356-9344-474b-b30e-392f07346502/tl-PH-851bc19f-b7d6-4355-9ab9-30783dd9c8fe.m3u8"
},

ep7: {
  video: "https://video-v6.mydramawave.com/vt/30f14914-13f6-430b-b5f1-72bb8cde020d/360_0/7_83ef53f6-02c5-419e-bef6-4301545689ed_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30f14914-13f6-430b-b5f1-72bb8cde020d/tl-PH-0966d3ba-74cd-45cf-ac82-a89d121c6f14/tl-PH-cc66b402-55ae-42d2-801c-9d05c8dbb7f3.m3u8"
},

ep8: {
  video: "https://video-v6.mydramawave.com/vt/0cf1d63c-b603-490e-8585-789048598e10/360_0/8_782003da-0bf7-45f2-a220-7a5c306ae81a_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/0cf1d63c-b603-490e-8585-789048598e10/tl-PH-d4c12593-f781-4500-87c8-e7c97b6a9222/tl-PH-d5970a91-8d89-42bb-b823-8e938a1b650a.m3u8"
},

ep9: {
  video: "https://video-v6.mydramawave.com/vt/b663b8d8-c627-4f0f-a765-04ef93b04439/360_0/9_3b625d47-78fa-4efd-8f72-82a55a658b6b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/b663b8d8-c627-4f0f-a765-04ef93b04439/tl-PH-1f5e81bf-6bf9-41e6-ae21-ce2a7f52180a/tl-PH-896718e6-3dc6-4b47-ae7b-27f69a15e5ff.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/bcc130ee-5520-4006-b2cc-cff85c727dee/360_0/10_53fe582c-85ab-4a7c-a23f-93c1876d6489_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/bcc130ee-5520-4006-b2cc-cff85c727dee/tl-PH-accb3b47-cf74-445a-b149-fca7d49fb855/tl-PH-cb1ee898-0848-434d-8ca6-653cafa5d046.m3u8"
},

ep11: {
  video: "https://video-v6.mydramawave.com/vt/cc7b84a6-ff6f-49b6-be8b-63373060f9db/360_0/11_7eb4096c-9cd8-45ef-acd2-95818814dd94_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/cc7b84a6-ff6f-49b6-be8b-63373060f9db/tl-PH-e1bffbf4-8a6f-4fca-8a6f-7e6030b35655/tl-PH-06412f82-54f6-4ee0-bdf7-a7f5cbaee692.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/95a86374-d8f6-4d03-81e0-f2c12bbec4fd/360_0/12_133d2ae4-1dd7-4510-a10e-fca52d5b8439_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/95a86374-d8f6-4d03-81e0-f2c12bbec4fd/tl-PH-29345893-d8cd-4fb2-97ce-2ec2bceef4e8/tl-PH-6b85e6dc-9ff6-4cc3-8863-7a5cbb6c977e.m3u8"
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
