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

const offers = [];
const connectedSockets = [];

io.on("connection", (socket) => {
  //   console.log("Someone has connected");
  const userName = socket.handshake.auth.userName;
  const password = socket.handshake.auth.password;

  if (password !== "x") {
    socket.disconnect(true);
    return;
  }

  connectedSockets.push({
    socketId: socket.id,
    userName,
  });

  socket.on("newOffer", (newOffer) => {
    offers.push({
      offererUserName: userName,
      offer: newOffer,
      offererIceCandidate: [],
      answererUserName: null,
      offer: null,
      answererIceCandidate: [],
    });

    // Send out to all connected sockets EXCEPT the caller
    socket.broadcast.emit("newOfferAwaiting", offers.slice(-1));
  });
});
