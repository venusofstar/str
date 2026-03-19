import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Your streams
const VIDEO = "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1774008569~acl=/*~id=214afb48-ac38-4446-8270-1ccd17b0be4f~data=hdntl,dWlkPW5VTkxWZnw3ZjAxZWMxNS1hMTQwLTRlZDMtODE2My1jOGQ1ZjMwZjg0Y2YmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQwMDg1OTcmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=9ffaf214f1f4bfd7ded21cd6b10760ff18ac8d2fb36925abd71c272873868f67";

const AUDIO = "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1774008569~acl=/*~id=214afb48-ac38-4446-8270-1ccd17b0be4f~data=hdntl,dWlkPW5VTkxWZnw3ZjAxZWMxNS1hMTQwLTRlZDMtODE2My1jOGQ1ZjMwZjg0Y2YmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQwMDg1OTcmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=9ffaf214f1f4bfd7ded21cd6b10760ff18ac8d2fb36925abd71c272873868f67";



const OUTPUT = "./stream";
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// 🔥 Start FFmpeg restream
function startStream() {
  const args = [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", VIDEO,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
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
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", VIDEO,
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
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
  res.send("ENJOY YOUR LIFE");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
