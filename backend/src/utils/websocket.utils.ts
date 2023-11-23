import { Server, Socket } from "socket.io";

export const setupCodeEditorSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // handle incoming messages for code editing
    socket.on("code-edit", (data: any) => {
      // broadcast the edited code to other connected clients
      socket.broadcast.emit("code-update", data);
    });
    // handle disconnect
    socket.on("disconnect", () => {
      console.log(`Socket disconnected ${socket.id}`);
    });
  });
};
