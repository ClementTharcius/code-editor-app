import { login, verifyToken } from "../controllers/auth.controller";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  return login(req, res);
});
router.get("/verify-token", async (req: Request, res: Response) => {
  return verifyToken(req, res);
});

export default router;

// import { FastifyInstance } from 'fastify';
// import { login, verifyToken } from '../controllers/auth.controller';

// const authRoutes = async (fastify: FastifyInstance) => {
//   fastify.post('/login', login);
//   fastify.get('/verify-token', verifyToken);
// };

// export default authRoutes;
