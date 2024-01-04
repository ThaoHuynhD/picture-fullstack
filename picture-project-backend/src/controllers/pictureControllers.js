import { PrismaClient } from "@prisma/client";
import { respsonseData } from "../config/response.js";
import { promises as fs } from 'fs'
import { readFile, writeFile, unlink } from 'fs/promises';
import heicConvert from 'heic-convert';

const prisma = new PrismaClient();

const changeFileName = async (oldName, newName) => {
    let oldPath = process.cwd() + `/public/img/` + oldName;
    let newPath = process.cwd() + `/public/img/` + newName;

    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Error renaming file from ${oldPath} to ${newPath}: ${err}`);
                reject(err);
            } else {
                console.log(`File Path changed from ${oldPath} to ${newPath}`);
                resolve();
            }

            // This will be executed regardless of whether an error occurred or not
            console.log("done");
            console.log("finist");
        });
    });
}
const setFileCreationTime = async (filePath, creationTime) => {
    try {
        const stats = await fs.stat(filePath);

        const updatedStats = {
            ...stats,
            atime: creationTime,
            mtime: creationTime,
            ctime: creationTime,
            birthtime: creationTime,
        };

        await fs.utimes(filePath, updatedStats.atime, updatedStats.mtime);
    } catch (error) {
        console.error(`Error setting creation time for file ${filePath}: ${error.message}`);
        throw error;
    }
};

const convertHeicToJpg = async (originalFilePath, outputFilePath) => {
    try {
        const heicBuffer = await readFile(originalFilePath);
        const rawImageData = await heicConvert({
            buffer: heicBuffer,
            format: 'JPEG',
        });
        console.log("rawImageData: ", rawImageData);

        const jpegBuffer = Buffer.from(rawImageData);

        await writeFile(outputFilePath, jpegBuffer);

        await unlink(`${outputFilePath.replace(/\.[^/.]+$/, "")}.heic`);
        console.log('Old HEIC file deleted.');
    } catch (error) {
        console.error('Error converting HEIC to JPG:', error.message);
    }
}
export const uploadImg = async (req, res) => {
    let {
        img_name,
        img_description,
        img_capture_time,
        img_capture_location
    } = req.body;

    if (req.files && req.files.length > 0) {
        try {
            let imgUploadedArr = [];
            await Promise.all(req.files.map(async (file) => {
                let originalFilePath = process.cwd() + `/public/origin/${file.originalname}`;
                let stats = await fs.stat(originalFilePath);


                let img_capture_time1 = img_capture_time || stats.mtime;

                // Cài lại ngày modify cho file
                let filePath = process.cwd() + `/public/img/${file.filename}`;
                let newCreationTime = new Date(img_capture_time1);
                await setFileCreationTime(filePath, newCreationTime);

                // Đổi tên file
                let stats2 = await fs.stat(filePath);

                const formattedTime = stats2.mtime.toISOString().split('T')[0].replace(/-/g, '');
                let newName = `${formattedTime}${file.filename.slice(8)}`;

                await changeFileName(file.filename, newName);
                file.filename = newName;

                let imgUploaded = await prisma.picture.create({
                    data: {
                        img_name,
                        img_path: file.filename,
                        img_description,
                        img_capture_time,
                        img_capture_location
                    }
                });
                imgUploadedArr.push(imgUploaded);
            }));

            respsonseData(res, "Successfully handled", " imgUploadedArr", 200);
        } catch {
            respsonseData(res, "Error processing files", "", 500);
        }
    } else {
        respsonseData(res, "No files uploaded", "", 400);
    }
}

export const delImg = async (req, res) => {
    try {
        let { img_id } = req.params;
        img_id = +img_id;
        let data = await prisma.picture.findMany({
            where: {
                img_id,
            },
        });
        if (data.length !== 0) {
            await prisma.picture.deleteMany({
                where: {
                    img_id,
                },
            });
            respsonseData(res, `Deleted Img id ${img_id}`, "", 200);
        }
        else {
            respsonseData(res, `No image match id ${img_id}`, "", 404);
        }
    } catch (error) {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};

export const delAllImg = async (req, res) => {
    try {
        await prisma.picture.deleteMany({});
        respsonseData(res, `Deleted All Img`, "", 200);
    } catch {
        respsonseData(res, "Unexpected Error", "", 500);
    }
};

export const convertHeicInToJpg = async (req, res) => {
    if (req.files && req.files.length > 0) {
        try {
            let imgUploadedArr = [];
            await Promise.all(req.files.map(async (file) => {
                let originalFilePath = process.cwd() + `/public/origin/${file.originalname}`;
                let outputFilePath = process.cwd() + `/public/img/${file.filename.replace(/\.[^/.]+$/, "")}.jpg`;

                await convertHeicToJpg(originalFilePath, outputFilePath);
                console.log("originalFilePath: ", originalFilePath);
            }));

            respsonseData(res, "Successfully handled", imgUploadedArr, 200);
        } catch {
            respsonseData(res, "Error processing files", "", 500);
        }
    } else {
        respsonseData(res, "No files uploaded", "", 400);
    }
}
