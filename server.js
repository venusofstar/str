import express from "express";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;

// 🔥 Your streams
const VIDEO = "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_video.m3u8?hdnea=st=1773925442~exp=1773925482~acl=*hls/live/2001903/300024-317970/*!*hls/live/2001903-b/300024-317970-b/*~id=1ebf1215-7077-4f11-9ba3-e530c94f9e70~data=dWlkPWNGaDZGenw2YzcyNmIzMS03NDAxLTRkMDgtYWM1Zi1jNDFiOWFiYzU0NWUmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQwMTE4ODImZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=1a409eafbdbbb38c5dd33c0a96f78e0317b0e242e5b326ae4420145eba316a76&opId=325&cc=PH&ua=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxMzkuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xMzkuMA%3D%3D&sd=PH-METRO+MANILA&startTime=1772294400&endTime=1930147200";

const AUDIO = "https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdnea=st=1773925442~exp=1773925482~acl=*hls/live/2001903/300024-317970/*!*hls/live/2001903-b/300024-317970-b/*~id=1ebf1215-7077-4f11-9ba3-e530c94f9e70~data=dWlkPWNGaDZGenw2YzcyNmIzMS03NDAxLTRkMDgtYWM1Zi1jNDFiOWFiYzU0NWUmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzQwMTE4ODImZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=1a409eafbdbbb38c5dd33c0a96f78e0317b0e242e5b326ae4420145eba316a76&opId=325&cc=PH&ua=TW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0OyBydjoxMzkuMCkgR2Vja28vMjAxMDAxMDEgRmlyZWZveC8xMzkuMA%3D%3D&sd=PH-METRO+MANILA&startTime=1772294400&endTime=1930147200";

const OUTPUT = "./stream";

// Ensure folder exists
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT);

// 🔥 Clean old HLS files (VERY IMPORTANT)
function cleanOutput() {
  try {
    fs.readdirSync(OUTPUT).forEach(file => {
      fs.unlinkSync(path.join(OUTPUT, file));
    });
  } catch (e) {
    console.log("Clean error:", e.message);
  }
}

// 🔥 Start FFmpeg restream
function startStream() {
  cleanOutput();

  const args = [
    "-fflags", "+genpts",

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", VIDEO,

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", AUDIO,

    "-map", "0:v:0",
    "-map", "1:a:0",

    // ✅ FIX SYNC (re-encode)
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-tune", "zerolatency",

    "-c:a", "aac",
    "-ar", "44100",
    "-ac", "2",
    "-af", "aresample=async=1:first_pts=0",

    "-vsync", "1",
    "-async", "1",

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
    setTimeout(startStream, 5000); // auto restart
  });
}

// Start stream
startStream();

// 🔥 Serve HLS
app.use("/live", express.static(OUTPUT));

// 🔥 Download endpoint (fixed sync)
app.get("/download", (req, res) => {
  const file = "output.mp4";

  const ffmpeg = spawn("ffmpeg", [
    "-fflags", "+genpts",

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", VIDEO,

    "-headers", "User-Agent: Mozilla/5.0\r\nReferer: https://app.blasttv.ph/\r\n",
    "-i", AUDIO,

    "-map", "0:v:0",
    "-map", "1:a:0",

    "-c:v", "libx264",
    "-preset", "veryfast",

    "-c:a", "aac",
    "-af", "aresample=async=1:first_pts=0",

    "-shortest",

    "-y",
    file
  ]);

  ffmpeg.on("close", () => {
    res.download(file);
  });
});

// Root
app.get("/", (req, res) => {
  res.send("ENJOY YOUR LIFE 🚀");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
