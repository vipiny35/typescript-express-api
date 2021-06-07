import express, { Router } from "express";
import { RegisterUser } from "../controllers/User.controller";

export const UserRoutes: Router = express.Router();

// api/user/register
UserRoutes.post("/register", RegisterUser);

// module.exports = UserRoutes;
