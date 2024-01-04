import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";

const prisma = new PrismaClient();

export const getAllImg = async (req, res) => {
    try {
        let data = await prisma.picture.findMany();

        if (!data) { respsonseData(res, "No data", "", 404); }
        else { respsonseData(res, "Successfully handled getAllImg", data, 200); }
    } catch {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};
export const getAllImgByYear = async (req, res) => {
    try {
        let { year } = req.params;
        let data = await prisma.picture.findMany({
            where: {
                img_capture_time: {
                    gte: new Date(`${year}-01-01T00:00:00.000Z`),
                    lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
                },
            },
        });

        if (!data) {
            respsonseData(res, "No data", "", 404);
        } else {
            respsonseData(res, "Successfully handled getAllImgByYear", data, 200);
        }
    } catch (error) {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};
