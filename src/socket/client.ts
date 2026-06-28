import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://house-of-edtech-j8s6.onrender.com", {
      transports: ["websocket"],
      autoConnect: false,
    });
  }

  return socket;
};