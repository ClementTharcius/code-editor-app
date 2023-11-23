"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    generateToken(user) {
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '1h' } // Token expiration time
        );
        return token;
    }
    comparePasswords(inputPassword, storedPassword) {
        // Logic to compare passwords (e.g., using bcrypt)
        return inputPassword === storedPassword;
    }
}
exports.AuthService = AuthService;
