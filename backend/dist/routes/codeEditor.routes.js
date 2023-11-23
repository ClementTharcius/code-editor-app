"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const codeEditor_controller_js_1 = require("../controllers/codeEditor.controller.js");
const codeEditorRoutes = (app) => {
    // Create an HTTP server using Express
    const server = http_1.default.createServer(app);
    // Initialize WebSocket server
    const wss = new ws_1.default.Server({ server });
    // WebSocket route for handling real-time collaboration
    app.get('/collaborate', (req, res) => {
        // Upgrade the HTTP request to a WebSocket connection
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            wss.emit('connection', ws, req);
        });
    });
    // Function to handle WebSocket connections
    (0, codeEditor_controller_js_1.handleWebSocketConnections)(wss);
    // Other routes for managing code files, retrieving code, etc.
};
exports.default = codeEditorRoutes;
// import { FastifyInstance } from 'fastify';
// import { createServer } from 'http';
// import { Server as WebSocketServer } from 'ws';
// import { handleWebSocketConnections } from '../controllers/codeEditor.controller';
// const codeEditorRoutes = async (fastify: FastifyInstance) => {
//   // HTTP server initialization
//   const httpServer = createServer();
//   const wss = new WebSocketServer({ server: httpServer });
//   // WebSocket route for handling real-time collaboration
//   fastify.get('/collaborate', (request, reply) => {
//     httpServer.emit('upgrade', request.raw, request.socket, Buffer.alloc(0), (ws) => {
//       wss.handleUpgrade(request, ws, request.raw);
//       wss.emit('connection', ws, request);
//     });
//   });
//   // Function to handle WebSocket connections
//   handleWebSocketConnections(wss);
//   // Other routes for managing code files, retrieving code, etc.
// };
// export default codeEditorRoutes;
//# sourceMappingURL=codeEditor.routes.js.map