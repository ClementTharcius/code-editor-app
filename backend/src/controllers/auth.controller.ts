import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { JWT_SECRET } from "../utils/jwt.utils";
import express, { Request, Response } from 'express';

const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
  try {
    console.log("here", req);

    // const { email, password }: any = req.body.email;
    console.log("here", req.body.email);
    const email = req.body.email;
    const password = req.body.password;
    // Check if user exists
    const userEmail = await User.findOne({ email });
    console.log(userEmail, "--email--");

    if (
      !userEmail ||
      !authService.comparePasswords(password, userEmail.password)
    ) {
      console.log("hererere");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Create JWT token
    const token = authService.generateToken(userEmail);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    console.log("ppepe");

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token, "--token--");

    if (!token) {
      res.status(401).json({ message: "Token not provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET || "");

    // Verify if the token is valid
    if (decoded) {
      res.json({ valid: true });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

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
