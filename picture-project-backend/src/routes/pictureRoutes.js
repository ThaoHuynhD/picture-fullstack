import express from "express";
import { convertHeicInToJpg, delAllImg, delImg, uploadImg } from "../controllers/pictureControllers.js";
import { uploadStorageImg } from "../config/upload.js";
const uploadLimit = (req, res, next) => {
    if (req.files && req.files.length > 10) {
        return res.status(400).json({ message: "Too many files. Maximum allowed: 10" });
    }
    next();
};
const pictureRoute = express.Router();

pictureRoute.post("/upload-img", uploadLimit, uploadStorageImg.array("img_path", 10), uploadImg);
pictureRoute.post("/convert-heic-to-jpg", uploadLimit, uploadStorageImg.array("img_path", 10), convertHeicInToJpg);

pictureRoute.delete("/del-img/:img_id", delImg);
pictureRoute.delete("/del-all-img", delAllImg);

export default pictureRoute;