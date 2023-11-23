"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_utils_1 = require("../utils/jwt.utils");
class AuthService {
    generateToken(user) {
        console.log(jwt_utils_1.JWT_SECRET, 'jere');
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id, email: user.email }, jwt_utils_1.JWT_SECRET || '', { expiresIn: '1h' } // Token expiration time
        );
        console.log(jwt_utils_1.JWT_SECRET, '-jsddsdsxdsdsdswt-');
        return token;
    }
    comparePasswords(inputPassword, storedPassword) {
        // Logic to compare passwords (e.g., using bcrypt)
        return inputPassword === storedPassword;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map