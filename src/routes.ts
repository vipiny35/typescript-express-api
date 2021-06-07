import express, { Router } from "express";
import { UserRoutes } from "./modules/app/routes/User.route"

export const Routes: Router = express.Router();

Routes.use('/user', UserRoutes);