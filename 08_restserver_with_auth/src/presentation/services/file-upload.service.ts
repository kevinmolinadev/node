import fs from "fs";
import { UploadedFile } from "express-fileupload";
export class FileUploadService {
    private readonly directory = "files"

    private verifyFolder() {
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory)
        }
    }

    saveFile(file: UploadedFile) {
        this.verifyFolder();
        return file.mv(`${this.directory}/${file.name}`);
    }

    async saveMultipleFile(files: UploadedFile[]) {
        await Promise.all(files.map(file => this.saveFile(file)))
    }
}