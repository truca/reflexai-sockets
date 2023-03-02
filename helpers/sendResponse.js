const { Messages } = require("../database/models/Messages");

const sendResponse = async (io, user, text, from) => {
  const createdAt = new Date();

  const message = await Messages.create({
    userId: user.userId,
    message: text,
    from,
    createdAt,
  });

  io.in(user.room).emit("message", {
    _id: message._id,
    userId: from === "bot" ? from : user.userId,
    text,
    createdAt,
  });
};

module.exports = { sendResponse };
