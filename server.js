const express = require("express");
const { spawn } = require("child_process");

const app = express();

app.use(express.static("public"));

const ffmpeg = spawn("bash", ["start.sh"]);

ffmpeg.stderr.on("data", data => {
 console.log(data.toString());
});

app.get("/", (req,res)=>{
res.send("HLS Restream Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log("Server started"));
