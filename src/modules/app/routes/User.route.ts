import express, { Router } from "express";
import { verifyJwtToken } from "../../../middlewares/verify-jwt-token";
import { GetUser, RegisterUser, LoginUser } from "../controllers/User.controller";

export const UserRoutes: Router = express.Router();

// api/user/register
UserRoutes.post("/register", RegisterUser);

// api/user/login
UserRoutes.post("/login", LoginUser);

// api/user/me
UserRoutes.get("/register", verifyJwtToken, GetUser);