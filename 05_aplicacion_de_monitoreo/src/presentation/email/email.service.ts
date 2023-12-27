import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface attachments {
    file: string,
    path: string
}

interface SendEmailOptions {
    to: string | string[],
    subject: string,
    html: string,
    attachments?: attachments[]
}

export class EmailService {
    private transport = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_EMAIL_KEY
        }
    })

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options
        try {
            const sendInformation = await this.transport.sendMail({
                to,
                subject,
                html,
                attachments
            })
            console.log(sendInformation);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}