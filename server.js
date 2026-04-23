import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Episodes
const EPISODES = {
ep1: {
  video: "https://video-v81.mydramawave.com/vt/6cad192b-d8d6-42b7-926e-e0b3634adfbf/360_0/89b35ab4-a510-43a9-9a21-ec0240012b79_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6cad192b-d8d6-42b7-926e-e0b3634adfbf/tl-PH-ab23feaa-4c0e-4880-bee1-832627ccf3f6/tl-PH-e027a7be-807f-48ea-b555-a34e9705f0dc.m3u8"
},

ep2: {
  video: "https://video-v81.mydramawave.com/vt/c934ba3c-390c-4046-9374-ab37b251b52d/360_0/ee65beee-195e-41e5-be7d-fa8e6ed2ab8b_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/c934ba3c-390c-4046-9374-ab37b251b52d/tl-PH-e6b9bd53-0f31-4496-8b4d-3d6d6fcc971a/tl-PH-105f1c17-6eca-45f8-8d4f-40998b98a472.m3u8"
},

ep3: {
  video: "https://video-v6.mydramawave.com/vt/85e99379-8929-49bd-8f8a-f2f2ce6f7f11/360_0/c6fef719-4831-4b19-98e5-7f4727b9cdd1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/85e99379-8929-49bd-8f8a-f2f2ce6f7f11/tl-PH-0f8a6e26-15f7-46aa-879f-0aafae76595e/tl-PH-f6819c41-8950-4e9b-a809-f39f62d64417.m3u8"
},

ep4: {
  video: "https://video-v81.mydramawave.com/vt/e0eb23f3-b311-4daf-b4b0-ecd6b91deea2/360_0/2067baea-ff8f-47b7-8a5f-e25d2b7958f9_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e0eb23f3-b311-4daf-b4b0-ecd6b91deea2/tl-PH-709656fe-e53b-4de0-ad07-782a3f008e27/tl-PH-99ec166d-904b-4bb3-94aa-358dda473bbe.m3u8"
},

ep5: {
  video: "https://video-v81.mydramawave.com/vt/6237f4f2-12f6-4491-9da3-8412e2294495/360_0/69663fc2-ea67-4102-8114-698c5a3db4db_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/6237f4f2-12f6-4491-9da3-8412e2294495/tl-PH-ba125e11-de96-443f-8b10-d1d2be5a522e/tl-PH-e4957247-e14b-4ea4-b527-dbf6945a6a68.m3u8"
},

ep6: {
  video: "https://video-v6.mydramawave.com/vt/3512cea9-6e37-41b5-9455-15de595ae982/360_0/5d1b6850-8715-447e-8f5f-90829737a205_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/3512cea9-6e37-41b5-9455-15de595ae982/tl-PH-6577393e-7980-4910-8fc6-0dcdc83b5550/tl-PH-f29d0f83-bfdf-41f7-9222-86256cf44775.m3u8"
},

ep7: {
  video: "https://video-v6.mydramawave.com/vt/38c4b425-cc0e-4779-b8ec-cba1bf08353b/360_0/9ab05ab4-f02a-4c70-b4a4-dd67038cfbb5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/38c4b425-cc0e-4779-b8ec-cba1bf08353b/tl-PH-17a56b64-e450-40a0-afbd-ba743b6b52fb/tl-PH-1a61662c-ee1a-4ab9-acd6-74ccd1017853.m3u8"
},

  ep8: {
  video: "https://video-v81.mydramawave.com/vt/83ed0759-aae7-454e-9fc6-d18b4511360e/360_0/f861c027-0387-4a56-b2d6-59e537d433ea_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/83ed0759-aae7-454e-9fc6-d18b4511360e/tl-PH-efd201e6-fbe1-4538-9b5e-675d92649cc0/tl-PH-b6cf2d9f-7ea5-48cd-b45d-a826f67c44a9.m3u8"
},
  
ep9: {
  video: "https://video-v6.mydramawave.com/vt/232fdbdd-1be1-4128-80a1-9668063449f5/360_0/1b8d4ff3-8123-49f3-9bee-aac92ac8516c_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/232fdbdd-1be1-4128-80a1-9668063449f5/tl-PH-1d732b6c-66b9-4a15-aa93-8f9bd4f65c5f/tl-PH-47699bcd-8c82-49df-8e7e-b86c67f8c75d.m3u8"
},

ep10: {
  video: "https://video-v81.mydramawave.com/vt/32fec9bc-26ab-4cd9-89af-b9984cb1c5c0/360_0/726421c2-9b44-43bf-832d-a7df1fda146e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/32fec9bc-26ab-4cd9-89af-b9984cb1c5c0/tl-PH-392d1553-cb44-4193-85f4-08d604acb509/tl-PH-3f830193-ed28-43be-8c20-4a386b597181.m3u8"
} ,
  ep11: {
  video: "https://video-v81.mydramawave.com/vt/e18bf837-e6b0-49c1-9afb-9ef21afea036/360_0/1783a954-6ca9-43ac-960e-79bc90a81459_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/e18bf837-e6b0-49c1-9afb-9ef21afea036/tl-PH-898a25ed-a1f4-4189-a26f-e439b3aa1062/tl-PH-92951c77-51ed-47f1-861e-2702c91a14fe.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/75ae6dc6-337d-4363-ac69-4bc63f2f5e4d/360_0/fbd2480e-8e20-43ef-834d-ac45a59d73bc_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/75ae6dc6-337d-4363-ac69-4bc63f2f5e4d/tl-PH-8654b668-7551-4eb8-a17a-017dbb9f3a4e/tl-PH-ed1afb90-7ebb-43ce-a412-a1ad51f4db58.m3u8"
},

ep13: {
  video: "https://video-v81.mydramawave.com/vt/f646a854-d736-4b13-9fa8-83e5151af53a/360_0/4080c452-2f09-4a87-b71f-8cfcfe444f65_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f646a854-d736-4b13-9fa8-83e5151af53a/tl-PH-bd7321d2-b536-45a8-8b3c-d3aa4bb764af/tl-PH-94239e6d-cd0f-43c9-b8e3-a46fda203198.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/c52355b6-4988-48fd-b9f2-f3c953c1d599/360_0/9565dfde-9bcb-40c4-bdd7-c2e3d3c93005_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c52355b6-4988-48fd-b9f2-f3c953c1d599/tl-PH-0f6cb18d-39ec-453a-a970-30877e873bc5/tl-PH-8521d77c-f6e6-4322-a7fc-1f8544ba489a.m3u8"
},

ep15: {
  video: "https://video-v6.mydramawave.com/vt/f2bd21ac-8dd1-4dab-905f-99680e3fbeb8/360_0/c0de857d-c195-4d29-a272-760bc9cfcbe5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f2bd21ac-8dd1-4dab-905f-99680e3fbeb8/tl-PH-cb737b07-7c18-4d28-8278-679f858bf8ea/tl-PH-f914957c-9da8-48e6-86aa-d18357bd9a76.m3u8"
},

ep16: {
  video: "https://video-v6.mydramawave.com/vt/f2bd956a-ab95-4fff-a8f9-8a4a6ce5bc91/360_0/9021550e-4ddc-4f0d-8822-dec3ea5cb1d6_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/f2bd956a-ab95-4fff-a8f9-8a4a6ce5bc91/tl-PH-f142a89a-0cf4-4361-8da4-2a40624843e1/tl-PH-7771a7f4-4e42-405e-881d-339c9fcd1106.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/1b81f4ad-8b40-43ff-99ba-9e4cafad4212/360_0/6cdadbed-55fe-49dc-b99a-08f159cc4757_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1b81f4ad-8b40-43ff-99ba-9e4cafad4212/tl-PH-204761c5-1144-403b-bf98-aa9acedc6f4f/tl-PH-a4fe286d-65cb-4465-97a9-5ab2dd21ebf6.m3u8"
},

ep18: {
  video: "https://video-v81.mydramawave.com/vt/a2831f99-b9e8-47df-8eda-a87819921808/360_0/1e20be22-cd8d-44fe-b4d3-ae7db0f308d1_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/a2831f99-b9e8-47df-8eda-a87819921808/tl-PH-da9ddead-6623-4e5a-aded-33f4f732c9d4/tl-PH-14b25ea5-900e-4e28-95dd-86e6237c5419.m3u8"
},

ep19: {
  video: "https://video-v81.mydramawave.com/vt/8ba7cd0f-0b0c-4b7a-a065-e2c55a655e2a/360_0/ee0a9fd3-1ab3-440b-89cc-ae85dca5679e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8ba7cd0f-0b0c-4b7a-a065-e2c55a655e2a/tl-PH-4a8c1312-6051-435e-bdac-260ce91ada65/tl-PH-aedce0f5-87e3-4f92-8157-ca7f4423630c.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/8f0afcee-c56c-41a6-b620-a7629b3f6b98/360_0/4b189f5e-2e51-4637-b53e-7f86c6fe0ad3_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/8f0afcee-c56c-41a6-b620-a7629b3f6b98/tl-PH-684de690-d902-4f5e-9a93-85bb1a02347a/tl-PH-fbcfa8e1-3564-4ac2-81f1-7207f04d9dd0.m3u8"
},
  ep21: {
  video: "https://video-v81.mydramawave.com/vt/9201d17f-63ef-44cd-a8af-af687ab96c81/360_0/692680b8-1d51-4a52-aef4-bbf04a6ce19e_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/9201d17f-63ef-44cd-a8af-af687ab96c81/tl-PH-c0ebf51d-2044-4d09-9fae-ef784e37e88a/tl-PH-a19f01d6-8692-47be-bb8c-799fb2961ddf.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/447b1a6f-cb51-4436-8c43-84cdaa2e66d4/360_0/0195b421-2c32-4d4f-b17f-540e5ff4e3d7_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/447b1a6f-cb51-4436-8c43-84cdaa2e66d4/tl-PH-6805a420-a7b5-423d-a54a-14165e202dbe/tl-PH-055a376d-65ae-43ab-b8c0-8d7a9f5d21f4.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/96e67c6b-47f5-4267-83fa-56c088919e6c/360_0/e46130a1-b26c-4a7c-85a6-806b0f4b81be_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/96e67c6b-47f5-4267-83fa-56c088919e6c/tl-PH-9adbf4e1-e46a-479f-b64e-f0ae5fae41a2/tl-PH-985683ff-fcaf-4a44-abef-1420a7d1fed9.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/7d97d532-3c23-4bca-9eb6-b5f175b57d4b/360_0/390a64ea-5bd5-4771-ba8c-73817cd64db0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7d97d532-3c23-4bca-9eb6-b5f175b57d4b/tl-PH-54831142-5ef6-4a05-ae72-edc8808afc01/tl-PH-2566e41d-9468-422a-afc3-17c81903be5c.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/7f1d30a9-51ec-4239-8c37-f6df4c9a0a03/360_0/b5940bb7-bd83-406e-9508-1118edb1252d_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7f1d30a9-51ec-4239-8c37-f6df4c9a0a03/tl-PH-0cf167e7-0f85-472a-813b-0ca597745bb8/tl-PH-7d4cddf6-b6e8-4a73-bbc2-8d9d0d20aab4.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/1f504895-bb80-4242-8708-a04216d7f7ba/360_0/b7c2006d-76de-4a77-aa4c-3332934be9b5_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1f504895-bb80-4242-8708-a04216d7f7ba/tl-PH-37491fd0-8919-475a-b0f0-c7055a07af1e/tl-PH-7253af1f-d4dd-4e06-869b-1b53dd62e3f8.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/6f4d3c2a-cb0c-4b44-a1b6-c940c8c9b67a/360_0/3f99435e-e9df-44df-a5e2-882ad55de8f0_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/6f4d3c2a-cb0c-4b44-a1b6-c940c8c9b67a/tl-PH-69659764-706c-497d-b993-8496250895a5/tl-PH-9c4a22a6-cffd-4649-b9ff-7ca06198f6d8.m3u8"
},

ep28: {
  video: "https://video-v81.mydramawave.com/vt/dd2e4bdf-70c7-407b-976f-6ddf38fa7b4b/360_0/37c6c2b5-fdab-4ecb-9562-2f74fbaeee23_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/dd2e4bdf-70c7-407b-976f-6ddf38fa7b4b/tl-PH-343b08b3-2409-4853-9496-18d7e471656f/tl-PH-f8d8f4d7-aba0-40db-b69a-f89040b93e71.m3u8"
},

ep29: {
  video: "https://video-v81.mydramawave.com/vt/d706145a-7363-49b6-9e5c-51b212305797/360_0/dd797b77-f456-4e21-91ff-7f3689c184b4_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/d706145a-7363-49b6-9e5c-51b212305797/tl-PH-cf1f2ee6-f177-4092-9d05-5aec64c8a362/tl-PH-c87e88e3-adec-4973-9a93-90ef8ad68f2c.m3u8"
},

ep30: {
  video: "https://video-v6.mydramawave.com/vt/c5a69a8a-ee68-4d4b-8fc8-cf236f48ee70/360_0/097b91d7-aa06-42ae-8fb0-f0cfa1f49153_transcode_1309546_adaptiveDynamicStreaming_1307828_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c5a69a8a-ee68-4d4b-8fc8-cf236f48ee70/tl-PH-1ec0e00d-2718-4245-b940-4363e1afd1e4/tl-PH-d9c79f7c-de14-4eb2-9e87-41a33b320b52.m3u8"
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
