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
exports.verifyToken = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("../services/auth.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const authService = new auth_service_1.AuthService();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here", req);
        // const { email, password }: any = req.body.email;
        console.log("here", req.body.email);
        const email = req.body.email;
        const password = req.body.password;
        // Check if user exists
        const userEmail = yield user_model_1.User.findOne({ email });
        console.log(userEmail, "--email--");
        if (!userEmail ||
            !authService.comparePasswords(password, userEmail.password)) {
            console.log("hererere");
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Create JWT token
        const token = authService.generateToken(userEmail);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("ppepe");
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token, "--token--");
        if (!token) {
            res.status(401).json({ message: "Token not provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwt_utils_1.JWT_SECRET || "");
        // Verify if the token is valid
        if (decoded) {
            res.json({ valid: true });
        }
        else {
            res.status(401).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyToken = verifyToken;
// import { FastifyRequest, FastifyReply } from "fastify";
// import { sign, verify } from "jsonwebtoken";
// import { User } from "../models/user.model";
// import { AuthService } from "../services/auth.service";
// import { JWT_SECRET } from '../utils/jwt.utils';
// const authService = new AuthService();
// export const login = async (req: FastifyRequest, reply: FastifyReply) => {
//   try {
//     const { email, password }: any = req.body;
//     console.log("here");
//     // Check if user exists
//     const userEmail = await User.findOne({ email });
//     console.log(userEmail, "--email--");
//     if (
//       !userEmail ||
//       !authService.comparePasswords(password, userEmail.password)
//     ) {
//       console.log("hererere");
//       reply.code(401).send({ message: "Invalid email or password" });
//       return;
//     }
//     // Create JWT token
//     const token = authService.generateToken(userEmail);
//     reply.send({ token });
//   } catch (error) {
//     reply.code(500).send({ message: "Internal server error" });
//   }
// };
// export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
//   try {
// console.log('ppepe');
//     const token = req.headers.authorization?.split(" ")[1];
//     console.log(token,'--token--');
//     if (!token) {
//       reply.code(401).send({ message: "Token not provided" });
//       return;
//     }
//     const decoded = verify(token, JWT_SECRET || "");
//     // Verify if the token is valid
//     if (decoded) {
//       reply.send({ valid: true });
//     } else {
//       reply.code(401).send({ message: "Invalid token" });
//     }
//   } catch (error) {
//     reply.code(500).send({ message: "Internal server error" });
//   }
// };
//# sourceMappingURL=auth.controller.js.map