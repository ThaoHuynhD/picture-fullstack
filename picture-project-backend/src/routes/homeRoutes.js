import express from "express";
import { getAllImg, getAllImgByYear } from "../controllers/homeControllers.js";

const homeRoute = express.Router();

homeRoute.get("/get-all-img", getAllImg);
homeRoute.get("/get-img-by-year/:year", getAllImgByYear);

export default homeRoute;
