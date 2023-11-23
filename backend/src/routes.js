"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const routes = {
    // define your routes here
    authRoutes: auth_routes_1.default
};
exports.default = routes;
