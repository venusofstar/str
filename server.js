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
},
  ep11: {
  video: "https://video-v81.mydramawave.com/vt/16adb980-a226-4379-8560-c5c6d8b3a80d/360_0/11_a25e137a-a7f3-4938-acc2-7062e5bcdb40_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/16adb980-a226-4379-8560-c5c6d8b3a80d/tl-PH-9eaae31f-4420-49bf-976c-3577a0fb6ca8/tl-PH-6c9f2703-d08e-4e7f-b8ad-b5bda53f25f8.m3u8"
},

ep12: {
  video: "https://video-v6.mydramawave.com/vt/41a71432-88f7-41b5-89cd-97d8d1d9173b/360_0/12_c754d7e1-fe48-4e74-9dfa-3c23adf04411_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/41a71432-88f7-41b5-89cd-97d8d1d9173b/tl-PH-6d2bb07a-19a6-46f4-b5e5-16da20e74d31/tl-PH-02fec1f4-25ea-4739-ad00-d80ff985433d.m3u8"
},

ep13: {
  video: "https://video-v6.mydramawave.com/vt/c29b39f9-9d00-4282-8d5e-03c67f2240db/360_0/13_2db62f6f-17b3-46ec-af10-a74b680326ee_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/c29b39f9-9d00-4282-8d5e-03c67f2240db/tl-PH-fd6c3db4-71eb-4f59-8a5d-b0881cbd5ca5/tl-PH-21e74dbf-5b61-467d-baf7-d32bbc9daef8.m3u8"
},

ep14: {
  video: "https://video-v6.mydramawave.com/vt/94ae71a1-19ff-4d31-8a9d-7d46c1d5623f/360_0/14_74ea4cc2-f4ac-40b5-b59e-7d5c339bb7e1_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/94ae71a1-19ff-4d31-8a9d-7d46c1d5623f/tl-PH-6076af04-34cd-44f7-af12-6ea1044ba140/tl-PH-731d17c7-6343-4a5f-9d09-48beb4a2296d.m3u8"
},

ep15: {
  video: "https://video-v81.mydramawave.com/vt/7ec3ff31-6e1a-4ee5-bcc3-338af952d523/360_0/15_faf47987-0f79-4457-b818-bb45027917bd_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/7ec3ff31-6e1a-4ee5-bcc3-338af952d523/tl-PH-e83e8014-5d35-44f4-9857-417e3b8c6dd5/tl-PH-c33c2167-6f6b-4ef4-aad6-b843bb0137c0.m3u8"
},

ep16: {
  video: "https://video-v81.mydramawave.com/vt/52d04ff0-4a60-4042-ae78-d8b1c623badc/360_0/16_fe7db98d-afe8-4b39-9311-b998bbdacde0_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/52d04ff0-4a60-4042-ae78-d8b1c623badc/tl-PH-d334dbcb-72c4-4fd4-b87c-a359d3be3869/tl-PH-b9e80914-cdd6-467b-9cd0-eb6b6f43a31a.m3u8"
},

ep17: {
  video: "https://video-v6.mydramawave.com/vt/7334235b-e949-4139-8303-ecf153d5b6b8/360_0/17_1171341c-201b-41ee-9d6a-9d7962eb8737_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7334235b-e949-4139-8303-ecf153d5b6b8/tl-PH-a8c4267b-0d4a-4379-b100-da51bb136440/tl-PH-70ed3361-a421-4775-9bd3-da7bd8e0f429.m3u8"
},

ep18: {
  video: "https://video-v6.mydramawave.com/vt/1664d6d8-9f31-4e8b-8fd2-66bc6aa9d9f8/360_0/18_c68e4a2b-f46f-459b-9ce7-c95ee83599e6_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/1664d6d8-9f31-4e8b-8fd2-66bc6aa9d9f8/tl-PH-cbff5499-5a8b-4b86-a1b5-b9aaf0ab0fb0/tl-PH-5bd26e25-d9d8-402f-b4ef-22c660bf95ce.m3u8"
},

ep19: {
  video: "https://video-v81.mydramawave.com/vt/4c29ef75-596c-4729-883a-6c3e991ff2f1/360_0/19_876edf6a-a720-40e2-8f76-776d3b63c38d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/4c29ef75-596c-4729-883a-6c3e991ff2f1/tl-PH-a6fd889c-8de4-431b-ac3f-39f7a4ae138d/tl-PH-8b70c87d-db6f-4c0f-8c35-49b0ab5a578f.m3u8"
},

ep20: {
  video: "https://video-v81.mydramawave.com/vt/2bdddb9c-ab48-4323-98e9-3c1ee76b2524/360_0/20_9a082f15-c463-4dda-818f-f031e004f978_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/2bdddb9c-ab48-4323-98e9-3c1ee76b2524/tl-PH-831ec93f-9320-49cf-86ab-67b5ba433ba5/tl-PH-2cdb9fcf-fba7-438f-8c2e-60278b4ffc36.m3u8"
},
  ep21: {
  video: "https://video-v6.mydramawave.com/vt/e2f415da-135b-4a33-af71-b0be8234693c/360_0/21_4f55167a-e052-453c-b3db-6c6922ee05ff_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/e2f415da-135b-4a33-af71-b0be8234693c/tl-PH-fdf7a974-d60b-44ee-bf4f-b99efb8e6748/tl-PH-20406688-ba32-4198-8899-dfa2c1e8a0da.m3u8"
},

ep22: {
  video: "https://video-v6.mydramawave.com/vt/36690297-1e02-47a5-96d7-d93e732dbee8/360_0/22_57e8a704-6c8a-40de-9fa3-5c6290151a9b_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/36690297-1e02-47a5-96d7-d93e732dbee8/tl-PH-693e3252-d747-4434-bd16-b93215ae9371/tl-PH-0ed39f9e-5ac6-48d5-9cb3-91ed5cfe8b9c.m3u8"
},

ep23: {
  video: "https://video-v6.mydramawave.com/vt/08f74636-468c-4def-8345-b62c51d00408/360_0/23_698108b6-7214-44ce-bed0-bea657a74fd1_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/08f74636-468c-4def-8345-b62c51d00408/tl-PH-f058c353-4965-44bc-99af-0b49d5cda869/tl-PH-c38f8d53-fc61-40dc-9ea9-a102f97298bc.m3u8"
},

ep24: {
  video: "https://video-v81.mydramawave.com/vt/3787bbdd-25b6-4d1a-b2e5-b3a339954fad/360_0/24_3f8a585e-8af7-40d9-b2e9-b3b94e514f4e_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/3787bbdd-25b6-4d1a-b2e5-b3a339954fad/tl-PH-6fceb8fa-b9a5-45a0-bc62-2aa92869b17a/tl-PH-4e00e2ae-3039-41d7-92e5-136f8b7b922b.m3u8"
},

ep25: {
  video: "https://video-v6.mydramawave.com/vt/9d65e273-efe7-4c58-9d0a-390bdb95dd43/360_0/25_57c1f9ce-631d-4ef6-ae11-6061b242428f_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/9d65e273-efe7-4c58-9d0a-390bdb95dd43/tl-PH-9374808f-a616-4e35-9279-3da45b2fb5ac/tl-PH-21966f3e-cd48-4e7c-a222-6b697b3ffc81.m3u8"
},

ep26: {
  video: "https://video-v6.mydramawave.com/vt/452cd77f-d89d-479e-8293-dd3cd9e3f7a1/360_0/26_1134a126-0b6f-4a9a-909a-b72673a196c8_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/452cd77f-d89d-479e-8293-dd3cd9e3f7a1/tl-PH-0930b3dd-64ce-44d3-acd4-872899f4c56a/tl-PH-d49bc764-d77b-4c1c-bc18-c791d6a56dc2.m3u8"
},

ep27: {
  video: "https://video-v6.mydramawave.com/vt/7647ec36-fa34-46d3-ab1d-784e39b11090/360_0/27_48983fdd-8b42-4131-af6c-000efb1c97e5_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/7647ec36-fa34-46d3-ab1d-784e39b11090/tl-PH-d1f01a18-c6a1-4496-a79f-aa74fb82a46d/tl-PH-112b5b95-43c8-45a7-ba44-c1c20b17abfc.m3u8"
},

ep28: {
  video: "https://video-v6.mydramawave.com/vt/049900f6-5659-4896-9e86-6d817ddb2db0/360_0/28_ccaebcd8-de02-4a55-8e14-94ffa5ade543_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/049900f6-5659-4896-9e86-6d817ddb2db0/tl-PH-d9d07ef3-eefb-4258-a034-62f3fdb582e1/tl-PH-eb566d41-b12d-4820-a4df-70c1732159b6.m3u8"
},

ep29: {
  video: "https://video-v6.mydramawave.com/vt/8239c347-a32f-4f3a-8a2a-19699aec4403/360_0/29_50d384ab-e12c-450d-aaf9-a86588290570_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v6.mydramawave.com/vt/8239c347-a32f-4f3a-8a2a-19699aec4403/tl-PH-6aa9d195-7766-49ef-9019-376dd3f608da/tl-PH-3938f74b-a8b5-48d7-b1db-7f9708d2d6d2.m3u8"
},

ep30: {
  video: "https://video-v81.mydramawave.com/vt/f75b9e6f-64f9-493a-b4c3-331289c8ea9f/360_0/30_546596cd-fa87-42ee-aa15-2d39713d824d_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8",
  audio: "https://video-v81.mydramawave.com/vt/f75b9e6f-64f9-493a-b4c3-331289c8ea9f/tl-PH-9f604d6a-89c4-44f9-988d-d472ccce2ef8/tl-PH-cf381ec1-8df6-4f61-903c-11efdf0891ea.m3u8"
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
