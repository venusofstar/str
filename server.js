import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Your streams
const VIDEO = "https://video-v81.mydramawave.com/vt/0e2e5089-bc95-451b-aa66-fd8c7f2574e2/360_0/5_2f1ceeeb-9278-464b-82ae-7bb2100904d2_transcode_1309546_adaptiveDynamicStreaming_1519065_transcode_1581789.m3u8";

const AUDIO = "https://video-v81.mydramawave.com/vt/0e2e5089-bc95-451b-aa66-fd8c7f2574e2/tl-PH-62edaa30-0ab1-46bb-843b-1f3aec9f6004/tl-PH-6ced4954-cb85-4fe2-bb48-693846cb47a7.m3u8";

const OUTPUT = "./stream";
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// 🔥 Start FFmpeg restream
function startStream() {
  const args = [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", VIDEO,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", AUDIO,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac",
    "-f", "hls",
    "-hls_time", "6",
    "-hls_list_size", "10",
    "-hls_flags", "delete_segments",
    path.join(OUTPUT, "index.m3u8")
  ];

  const ffmpeg = spawn("ffmpeg", args);

  ffmpeg.stderr.on("data", data => {
    console.log(data.toString());
  });

  ffmpeg.on("close", code => {
    console.log("FFmpeg stopped:", code);
    setTimeout(startStream, 5000); // restart
  });
}

// Start once
startStream();

// Serve HLS
app.use("/live", express.static(OUTPUT));

// Download endpoint
app.get("/download", (req, res) => {
  const file = "output.mp4";

  const ffmpeg = spawn("ffmpeg", [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", VIDEO,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://mydramawave.com/\r\n",
    "-i", AUDIO,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c", "copy",
    "-f", "mp4",
    file
  ]);

  ffmpeg.on("close", () => {
    res.download(file);
  });
});

app.get("/", (req, res) => {
  res.send("Restream server running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
