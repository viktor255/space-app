const Message = require('../models/message');
const Spaceflight = require('../models/spaceflight');


exports.socketAll = function (server) {
  const io = require('socket.io')(server);

  io.on("connection", socket => {
    let previousId;

    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };

    socket.on("destroySpaceflight", spaceflightId => {
      Spaceflight.deleteOne({_id: spaceflightId})
        .then(result => {
          if (result.n > 0) {
            io.in(spaceflightId).emit("spaceflightDestroyed", spaceflightId);
          } else {
            console.log(result);
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
    socket.on("destroySpaceflightRequest", spaceflightId => {
      safeJoin(spaceflightId);
      io.in(spaceflightId).emit("spaceflightDestructionStarted", spaceflightId);
    });

    socket.on("joinSpaceflight", spaceflightId => {
      safeJoin(spaceflightId);
    });
    socket.on("leaveSpaceflight", spaceflightId => {
      socket.leave(spaceflightId);
    });

    socket.on("getChatWindow", spaceflightId => {
      safeJoin(spaceflightId);
      Message.find({spaceflightId: spaceflightId}).then(messages => {
        const chatWindow = {
          id: spaceflightId,
          messages: messages
        };
        socket.emit("chatWindow", chatWindow);
      });

    });

    socket.on("newMessage", obj => {
      const message = new Message({
        userEmail: obj.message.userEmail,
        spaceflightId: obj.message.spaceflightId,
        message: obj.message.message,
        timeStamp: obj.message.timeStamp
      });
      message.save().then(() => {
        Message.find({spaceflightId: obj.message.spaceflightId}).then(messages => {
          const chatWindow = {
            id: obj.message.spaceflightId,
            messages: messages
          };
          io.in(obj.message.spaceflightId).emit("chatWindow", chatWindow);
        }).catch(err => {
          console.log(err);
        });
      })
        .catch(err => {
          console.log(err);
        });
    });
  });
};



