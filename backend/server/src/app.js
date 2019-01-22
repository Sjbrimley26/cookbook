const http = require("http");
const io = require("socket.io");

const app = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("ok");
});

app.listen(3000);

io.on("connection", socket => {
  socket.emit("status", "connected successfully!");

  socket.on("upload recipe", data => {

  });

});