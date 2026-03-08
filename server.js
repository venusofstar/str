const express = require("express");
const { spawn } = require("child_process");

const app = express();

app.use(express.static("public"));

const ffmpeg = spawn("bash", ["start.sh"]);

ffmpeg.stdout.on("data", data => console.log(data.toString()));
ffmpeg.stderr.on("data", data => console.log(data.toString()));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});
