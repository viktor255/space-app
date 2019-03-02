
const Message = require('../models/message');


exports.getAllMessagesInChat = (req, res, next) => {
  Message.find({chatId: req.params.chatId}).then(messages => {
    res.status(200).json({
      message: 'Messages fetched successfully!',
      messages: messages
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching messages failed'
      });
    });
};

exports.createMessage = (req, res, next) => {
  const message = new Message({
    userEmail: req.body.userEmail,
    spaceflightId: req.body.spaceflightId,
    message: req.body.message,
    timeStamp: req.body.timeStamp
  });
  message.save().then(() => {
    res.status(201).json({
      message: message
    })
  })
    .catch(err => {
      res.status(500).json({
        message: 'Message was not created'
      });
    });
};

exports.socketAll = function (server) {
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
      // console.log('Getting chatWindow');
      // console.log(chatWindows[chatWindowId]);
    });

    socket.on("addChatWindow", chatWindow => {
      chatWindows[chatWindow.id] = chatWindow;
      safeJoin(chatWindow.id);
      io.emit("chatWindows", Object.keys(chatWindows));
      socket.emit("chatWindow", chatWindow);
      // console.log('ChatWindow added: ' + chatWindow);
      // console.log(chatWindow);
    });

    socket.on("newMessage", obj => {
      chatWindows[obj.chatWindow.id].messages.push(obj.message);
      io.in(obj.chatWindow.id).emit("chatWindow", chatWindows[obj.chatWindow.id]);
      // console.log('Message added: ' + obj.message);
      // console.log(obj.message);
      // console.log('To the chatWindow: ');
      // console.log(chatWindows[obj.chatWindow.id]);
    });


    io.emit("chatWindows", Object.keys(chatWindows));
  });
}


