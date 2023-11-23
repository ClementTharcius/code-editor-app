"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCodeEditorSocket = void 0;
const setupCodeEditorSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        // handle incoming messages for code editing
        socket.on("code-edit", (data) => {
            // broadcast the edited code to other connected clients
            socket.broadcast.emit("code-update", data);
        });
        // handle disconnect
        socket.on("disconnect", () => {
            console.log(`Socket disconnected ${socket.id}`);
        });
    });
};
exports.setupCodeEditorSocket = setupCodeEditorSocket;
//# sourceMappingURL=websocket.utils.js.map