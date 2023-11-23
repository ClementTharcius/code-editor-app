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
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_controller_1.login)(req, res);
}));
router.get("/verify-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_controller_1.verifyToken)(req, res);
}));
exports.default = router;
// import { FastifyInstance } from 'fastify';
// import { login, verifyToken } from '../controllers/auth.controller';
// const authRoutes = async (fastify: FastifyInstance) => {
//   fastify.post('/login', login);
//   fastify.get('/verify-token', verifyToken);
// };
// export default authRoutes;
//# sourceMappingURL=auth.routes.js.map