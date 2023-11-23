import { WebSocketServer } from 'ws';
import { CodeFile } from '../models/codeFile.model';

// Function to handle WebSocket connections
export const handleWebSocketConnections = (wss: WebSocketServer) => {
  wss.on('connection', (ws) => {
    // Handle incoming WebSocket messages (e.g., code changes, cursor positions)
    ws.on('message', async (data: string) => {
      // Process the received data (e.g., update code file, cursor position)
      // Example: Update code file based on the received changes
      const { fileId, changes } = JSON.parse(data);
      const codeFile = await CodeFile.findById(fileId);
      if (codeFile) {
        codeFile.code += changes; // Apply changes to the code
        await codeFile.save();
        // Broadcast the updated code to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocketServer.OPEN) {
            client.send(JSON.stringify({ fileId, code: codeFile.code }));
          }
        });
      }
    });

    // Handle WebSocket connection closure
    ws.on('close', () => {
      // Perform cleanup if needed
    });
  });
};


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
