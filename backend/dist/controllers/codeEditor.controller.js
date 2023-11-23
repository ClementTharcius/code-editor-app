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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSocketConnections = void 0;
const ws_1 = require("ws");
const codeFile_model_1 = require("../models/codeFile.model");
// Function to handle WebSocket connections
const handleWebSocketConnections = (wss) => {
    wss.on('connection', (ws) => {
        // Handle incoming WebSocket messages (e.g., code changes, cursor positions)
        ws.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            // Process the received data (e.g., update code file, cursor position)
            // Example: Update code file based on the received changes
            const { fileId, changes } = JSON.parse(data);
            const codeFile = yield codeFile_model_1.CodeFile.findById(fileId);
            if (codeFile) {
                codeFile.code += changes; // Apply changes to the code
                yield codeFile.save();
                // Broadcast the updated code to all connected clients
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === ws_1.WebSocketServer.OPEN) {
                        client.send(JSON.stringify({ fileId, code: codeFile.code }));
                    }
                });
            }
        }));
        // Handle WebSocket connection closure
        ws.on('close', () => {
            // Perform cleanup if needed
        });
    });
};
exports.handleWebSocketConnections = handleWebSocketConnections;
// import { FastifyRequest, FastifyReply } from 'fastify';
// import { WebSocketServer } from 'ws';
// import { CodeFile } from '../models/codeFile.model';
// // Function to handle WebSocket connections
// export const handleWebSocketConnections = (server: WebSocketServer) => {
//   server.on('connection', (ws) => {
//     // Handle incoming WebSocket messages (e.g., code changes, cursor positions)
//     ws.on('message', async (data: string) => {
//       // Process the received data (e.g., update code file, cursor position)
//       // Example: Update code file based on the received changes
//       const { fileId, changes } = JSON.parse(data);
//       const codeFile = await CodeFile.findById(fileId);
//       if (codeFile) {
//         codeFile.code += changes; // Apply changes to the code
//         await codeFile.save();
//         // Broadcast the updated code to all connected clients
//         server.clients.forEach((client) => {
//           if (client !== ws && client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ fileId, code: codeFile.code }));
//           }
//         });
//       }
//     });
//     // Handle WebSocket connection closure
//     ws.on('close', () => {
//       // Perform cleanup if needed
//     });
//   });
// };
// // Other controller functions for handling code file retrieval, creation, etc.
//# sourceMappingURL=codeEditor.controller.js.map