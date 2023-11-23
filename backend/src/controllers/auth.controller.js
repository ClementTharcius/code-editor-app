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
exports.verifyToken = exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
const login = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("here");
        // Check if user exists
        const userEmail = yield user_model_1.User.findOne({ email });
        console.log(userEmail, "--email--");
        if (!userEmail ||
            !authService.comparePasswords(password, userEmail.password)) {
            reply.code(401).send({ message: "Invalid email or password" });
            return;
        }
        // Create JWT token
        const token = authService.generateToken(userEmail);
        reply.send({ token });
    }
    catch (error) {
        reply.code(500).send({ message: "Internal server error" });
    }
});
exports.login = login;
const verifyToken = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            reply.code(401).send({ message: "Token not provided" });
            return;
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "");
        // Verify if the token is valid
        if (decoded) {
            reply.send({ valid: true });
        }
        else {
            reply.code(401).send({ message: "Invalid token" });
        }
    }
    catch (error) {
        reply.code(500).send({ message: "Internal server error" });
    }
});
exports.verifyToken = verifyToken;
