import * as crypto from "crypto";
const WEBHOOK_SECRET = process.env.GITHUB_SECRET_KEY ?? "";
export class AuthGithub {
    static verifySignature = ({ secret, body }: { secret: string, body: string }) => {
        const signature = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(body)
            .digest("hex");
        let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
        let untrusted = Buffer.from(secret, 'ascii');
        try {
            return crypto.timingSafeEqual(trusted, untrusted)
        } catch (error) {
            console.log(error);
            return false;
        };
    };
}