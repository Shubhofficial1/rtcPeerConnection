const https = require("https");
const fs = require("fs");
const express = require("express");
const app = express();
const socketio = require("socket.io");
app.use(express.static(__dirname));

const key = fs.readFileSync("cert.key");
const cert = fs.readFileSync("cert.crt");

const expressServer = https.createServer({ key, cert }, app);
const io = socketio(expressServer);
expressServer.listen(9000, () => {
  console.log("Server is running on port 9000");
});

io.on("connection", () => {
  console.log("Someone has connected");
});
