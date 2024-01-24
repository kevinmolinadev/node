import { Request, Response, NextFunction } from "express";
import * as crypto from "crypto";
import { envs } from "../../config";

const WEBHOOK_SECRET = envs.GITHUB_SECRET_KEY;
export class AuthGithub {

    static verify_signature = (req: Request) => {
        const signature = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");
        let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
        let untrusted = Buffer.from(req.header("x-hub-signature-256") ?? "unknown", 'ascii');
        return crypto.timingSafeEqual(trusted, untrusted);
    };

    static authSecret = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.verify_signature(req)) return res.status(401).send("Unauthorized");
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };

}