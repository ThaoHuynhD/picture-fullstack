import express from "express";
import homeRoute from "./homeRoutes.js";
import pictureRoute from "./pictureRoutes.js";
const rootRoute = express.Router();

rootRoute.use("", homeRoute);
rootRoute.use("/picture", pictureRoute);

export default rootRoute;