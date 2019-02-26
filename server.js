const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

const io = require('socket.io')(server);
const chatWindows = {};

io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getChatWindow", chatWindowId => {
    safeJoin(chatWindowId);
    socket.emit("chatWindow", chatWindows[chatWindowId]);
    console.log('Getting chatWindow');
    console.log(chatWindows[chatWindowId]);
  });

  socket.on("addChatWindow", chatWindow => {
    chatWindows[chatWindow.id] = chatWindow;
    safeJoin(chatWindow.id);
    io.emit("chatWindows", Object.keys(chatWindows));
    socket.emit("chatWindow", chatWindow);
    console.log('ChatWindow added: ' + chatWindow);
    console.log(chatWindow);
  });

  socket.on("newMessage", obj => {
    chatWindows[obj.chatWindow.id].messages.push(obj.message);
    socket.emit("chatWindow", chatWindows[obj.chatWindow.id]);
    console.log('Message added: ' + obj.message);
    console.log(obj.message);
    console.log('To the chatWindow: ');
    console.log(chatWindows[obj.chatWindow.id]);
  });

  socket.on("editChatWindow", chatWindow => {
    chatWindows[chatWindow.id] = chatWindow;
    socket.to(chatWindow.id).emit("chatWindow", chatWindow);
  });

  io.emit("chatWindows", Object.keys(chatWindows));
});
