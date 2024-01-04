import multer from 'multer';
import { promises as fs } from 'fs';

const storageImg = multer.diskStorage({
    destination: process.cwd() + "/public/img",
    filename: async (req, file, callback) => {
        try {
            const originalFilePath = process.cwd() + `/public/origin/${file.originalname}`;
            const stats = await fs.stat(originalFilePath);
            const modificationTime = stats.mtime;

            const formattedTime = modificationTime.toISOString().split('T')[0].replace(/-/g, '');

            const newName = `${formattedTime}` + "_" + new Date().getTime() + `.${file.originalname.split('.').pop().toLowerCase()}`;

            callback(null, newName);
        } catch (error) {
            console.error(`Error getting modification time for file ${file.originalname}: ${error.message}`);
            callback(error);
        }
    }
});

export const uploadStorageImg = multer({ storage: storageImg });




