const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const {
  getRandomResponseMessage,
} = require("./helpers/getRandomResponseMessage");
const { sendResponse } = require("./helpers/sendResponse");
const { initializeDB } = require("./database/helpers/initializeDB");
const { addUser, getUser, deleteUser, getUsers } = require("./helpers/users");

require("dotenv").config();

app.use(cors());

initializeDB();
io.on("connection", (socket) => {
  console.log("connection");
  socket.on("join", ({ room, name, userId }, callback) => {
    const { user, error } = addUser(socket.id, userId, name, room);
    if (error) return callback(error);
    socket.join(user.room);
    socket.in(room).emit("notification", {
      title: "Someone's here",
      description: `${user.name} just entered the room`,
    });
    io.in(room).emit("users", getUsers(room));
    sendResponse(io, user, "Welcome back!", "bot");
    callback();
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    if (user) {
      sendResponse(io, user, message, "user");

      setTimeout(() => {
        const response = getRandomResponseMessage();
        sendResponse(io, user, response, "bot");
      }, 1000);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id);
    if (user) {
      io.in(user.room).emit("notification", {
        title: "Someone just left",
        description: `${user.name} just left the room`,
      });
      io.in(user.room).emit("users", getUsers(user.room));
    }
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
