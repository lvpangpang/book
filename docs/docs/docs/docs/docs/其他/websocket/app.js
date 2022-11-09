var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  // 收到客戶端的abc命令將內容发送cba命令给客户端
  socket.on("abc", function (data) {
    io.emit("cba", data);
  });
  socket.on("disconnect", function () {
    console.log("a user left");
  });
});

server.listen(port, function () {
  console.log("server start on port : %d", port);
});
