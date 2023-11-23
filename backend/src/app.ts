import express from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { setupCodeEditorSocket } from "./utils/websocket.utils";
import codeEditorRoutes from "./routes/codeEditor.routes";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import bodyParser from 'body-parser';
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  /* Socket.IO configuration options */
  transports: ["websocket"], // Use only WebSockets
  cors: {
    origin: "https://yourfrontendapp.com", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
  pingTimeout: 5000, // Time in milliseconds
  pingInterval: 25000, // Time in milliseconds
});

setupCodeEditorSocket(io);

// Connect to MongoDB using Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/neokred_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 5000, // Example timeout configuration (optional)
    } as mongoose.ConnectOptions); // Type assertion to ConnectOptions
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToDatabase();

// Register routes
app.use(authRoutes);
app.use(codeEditorRoutes);

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
