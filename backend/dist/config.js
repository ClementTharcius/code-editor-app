"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGODB_URI = exports.JWT_SECRET = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.JWT_SECRET = _a.JWT_SECRET, exports.MONGODB_URI = _a.MONGODB_URI, exports.PORT = _a.PORT;
//# sourceMappingURL=config.js.map