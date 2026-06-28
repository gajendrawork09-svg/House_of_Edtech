import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SOCKET_EVENTS } from "./event";

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected:", socket.id);
  });

  socket.on(
  SOCKET_EVENTS.JOIN_DOCUMENT,
  ({ documentId }) => {
    socket.join(documentId);

    console.log(
      `${socket.id} joined ${documentId}`
    );
  }
);
socket.on(
  SOCKET_EVENTS.LEAVE_DOCUMENT,
  ({ documentId }) => {
    socket.leave(documentId);
  }
);
 socket.on(
  SOCKET_EVENTS.DOCUMENT_CHANGE,
  ({ documentId, content }) => {
    console.log("Received document change:", documentId);

    socket.to(documentId).emit(
      SOCKET_EVENTS.DOCUMENT_CHANGE,
      {
        documentId,
        content,
      }
    );
  }
);
});

server.listen(3001, () => {
  console.log("Socket Server Running on 3001");
});