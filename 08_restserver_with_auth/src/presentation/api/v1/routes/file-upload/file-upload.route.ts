import { Router } from "express";
import { Controller } from "./file-upload.controller";
import { FileUploadService } from "../../../../services/file-upload.service";

export class Route {
    static get routes() {
        const fileUpload = Router();
        const service = new FileUploadService();
        const controller = new Controller(service);

        fileUpload.post("/single", controller.save);
        fileUpload.post("/multiple", controller.saveMultiple);

        return fileUpload;
    }
}