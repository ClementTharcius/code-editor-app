"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const websocket_utils_1 = require("./utils/websocket.utils");
const codeEditor_routes_1 = __importDefault(require("./routes/codeEditor.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    /* Socket.IO configuration options */
    transports: ["websocket"], // Use only WebSockets
    cors: {
        origin: "https://yourfrontendapp.com", // Replace with your frontend URL
        methods: ["GET", "POST"],
    },
    pingTimeout: 5000, // Time in milliseconds
    pingInterval: 25000, // Time in milliseconds
});
(0, websocket_utils_1.setupCodeEditorSocket)(io);
// Connect to MongoDB using Mongoose
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/neokred_db", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // serverSelectionTimeoutMS: 5000, // Example timeout configuration (optional)
            }); // Type assertion to ConnectOptions
            console.log("MongoDB connected");
        }
        catch (err) {
            console.error("MongoDB connection error:", err);
        }
    });
}
connectToDatabase();
// Register routes
app.use(auth_routes_1.default);
app.use(codeEditor_routes_1.default);
const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// import fastify from "fastify";
// import { Server as HttpServer } from "http";
// import { Server as SocketIOServer, Socket } from "socket.io";
// import { setupCodeEditorSocket } from "./utils/websocket.utils";
// import codeEditorRoutes from "./routes/codeEditor.routes";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth.routes";
// const app = fastify();
// const httpServer: HttpServer = app.server as HttpServer; // Get the underlying HTTP server
// const io = new SocketIOServer(httpServer, {
//   /* Socket.IO configuration options */
//   transports: ["websocket"], // Use only WebSockets
//   cors: {
//     origin: "https://yourfrontendapp.com", // Replace with your frontend URL
//     methods: ["GET", "POST"],
//   },
//   pingTimeout: 5000, // Time in milliseconds
//   pingInterval: 25000, // Time in milliseconds
// });
// setupCodeEditorSocket(io);
// // Connect to MongoDB using Mongoose
// async function connectToDatabase() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/neokred_db", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Example timeout configuration (optional)
//     } as mongoose.ConnectOptions); // Type assertion to ConnectOptions
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// }
// connectToDatabase();
// // Register routes
// app.register(authRoutes);
// app.register(codeEditorRoutes)
// const PORT = process.env.PORT || 3000;
// httpServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
//# sourceMappingURL=app.js.map