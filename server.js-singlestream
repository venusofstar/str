import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Single master stream (audio + video already combined)
const STREAM = "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdntl=exp=1774100923~acl=%2f*~id=041b51b0-485a-45dd-b5f4-e60b758d4ad0~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQxMDA5NTEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=89f385be47d5337c965f884579ae39ffe4027b3451b283b23cfcd054914fbe39";

const OUTPUT = "./stream";

// Ensure folder exists
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// Clean old HLS files
function cleanOutput() {
  try {
    fs.readdirSync(OUTPUT).forEach(file => {
      fs.unlinkSync(path.join(OUTPUT, file));
    });
  } catch (e) {
    console.log("Clean error:", e.message);
  }
}

// Start FFmpeg
function startStream() {
  cleanOutput();

  const args = [
    "-fflags", "+genpts",

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", STREAM,

    // ✅ No need to re-encode (already synced)
    "-c", "copy",

    "-f", "hls",
    "-hls_time", "4",
    "-hls_list_size", "6",
    "-hls_flags", "delete_segments+append_list",

    "-reset_timestamps", "1",

    path.join(OUTPUT, "index.m3u8")
  ];

  console.log("Starting FFmpeg...");

  const ffmpeg = spawn("ffmpeg", args);

  ffmpeg.stderr.on("data", data => {
    console.log(data.toString());
  });

  ffmpeg.on("close", code => {
    console.log("FFmpeg stopped:", code);
    setTimeout(startStream, 5000);
  });
}

// Start
startStream();

// Serve HLS
app.use("/live", express.static(OUTPUT));

// Download endpoint (simple copy)
app.get("/download", (req, res) => {
  const file = "output.mp4";

  const ffmpeg = spawn("ffmpeg", [
    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", STREAM,

    "-c", "copy",
    "-y",
    file
  ]);

  ffmpeg.on("close", () => {
    res.download(file);
  });
});

app.get("/", (req, res) => {
  res.send("ENJOY YOUR LIFE 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
