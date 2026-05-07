
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
},
  ep13: {
  video: "https://video-v81.mydramawave.com/vt/887f35b8-632a-4a58-b13f-db987b31ad68/360_0/13_d6ac2eaf-562d-4b23-b11d-76299151ecdf_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/887f35b8-632a-4a58-b13f-db987b31ad68/tl-PH-7f15838c-c76f-492b-bea7-f1547b0ec5ea/tl-PH-d078f900-d320-419e-9702-d5165ada9fee.m3u8"
},

ep14: {
  video: "https://video-v81.mydramawave.com/vt/871d59cb-204e-4ac8-9eee-f3207b79394a/360_0/14_aea67f5e-edd9-4f97-bf2c-8556fa174fc0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/871d59cb-204e-4ac8-9eee-f3207b79394a/tl-PH-45be8442-165f-4751-9717-514da3d7383f/tl-PH-78d4d10b-e0bd-443b-80f2-b6dc6e83e040.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/409998c9-8b4e-4a64-acd0-a486c12e9c47/360_0/15_ec3d84d7-27ab-4f25-b939-9a620dd72e11_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/409998c9-8b4e-4a64-acd0-a486c12e9c47/tl-PH-a7899276-bdef-4c9c-8b58-b0725a6bc0b7/tl-PH-68f22e08-701f-43b8-9852-88aab8f4a8a9.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/89edf3e9-8f55-45fe-a35c-e424f8853fc1/360_0/16_93ec7f7f-d66c-46e3-9b25-77c93f4d2547_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/89edf3e9-8f55-45fe-a35c-e424f8853fc1/tl-PH-95017728-6fa6-43e8-a066-f1f09a2854b8/tl-PH-968b704a-247d-4ed9-a56a-62ca76c5d079.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/daee6ba7-52a4-4223-ac83-d24235684b87/360_0/17_ab4f2802-1a0c-4458-abdd-8263486cc513_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/daee6ba7-52a4-4223-ac83-d24235684b87/tl-PH-f2fbb54b-8116-490b-bf73-94347829095d/tl-PH-6cf406e3-8362-4edd-9b7e-89c20bcac549.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/30f87b2d-0603-42d1-a87a-da49cbd4b51f/360_0/18_a6c038c3-7475-47d0-aa54-4527e349b4f9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/30f87b2d-0603-42d1-a87a-da49cbd4b51f/tl-PH-fd0ad847-6c3c-4133-8def-196e486d16a8/tl-PH-ac183a6d-d951-4ba9-bafd-8cbe371a4f27.m3u8"
},

ep19: {
  video: "https://video-v6.mydramawave.com/vt/6ecbb02a-d5e9-42ed-b1b6-fb69add5de07/360_0/19_1b73d7cc-8459-4b7a-ada0-776526121241_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6ecbb02a-d5e9-42ed-b1b6-fb69add5de07/tl-PH-b9950cb3-4409-492f-ae59-9cecceac35b8/tl-PH-3b65ec70-eaaf-41e3-a191-761d782ce46e.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/be20352a-1084-4929-915f-75b8e170d367/360_0/20_eb64d09d-4d3a-4978-ad39-b5ab55f07692_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/be20352a-1084-4929-915f-75b8e170d367/tl-PH-dd35702e-8e72-4f02-b6b0-1a11f14a290d/tl-PH-49385729-be52-432e-b754-9bff03ca9135.m3u8"
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
