import { Request, Response } from "express";
import { FileUploadService } from "../../../../services/file-upload.service";
import { FileArray, UploadedFile } from "express-fileupload";
import { HttpError } from "../../../../../domain";

export class Controller {

    constructor(
        private readonly service: FileUploadService
    ) { }

    private validateFiles(files: FileArray) {
        if (!files) throw HttpError.badRequest("No file selected");
    }

    save = (req: Request, res: Response) => {
        this.validateFiles(req.files!);
        const files = Object.values(req.files!);
        this.service.saveFile(files[0] as UploadedFile).then(() => res.json("File saved"))
    }

    saveMultiple = (req: Request, res: Response) => {
        this.validateFiles(req.files!);
        let filesArray = Object.values(req.files!);
        this.service.saveMultipleFile(filesArray as UploadedFile[]).then(() => res.json("Files saved"))

    }
}

