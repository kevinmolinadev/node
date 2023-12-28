import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface attachments {
    filename: string,
    path: string
}

interface SendEmailOptions {
    from?: string
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
        const { from = envs.MAILER_EMAIL, to, subject, html, attachments = [] } = options
        try {
            const sendInformation = await this.transport.sendMail({
                from,
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

    async sendEmailWithLogsSystem(to: string | string[]): Promise<boolean> {
        const message: SendEmailOptions = {
            to,
            subject: "System logs report",
            html: `
            <h2>Daily reporting of system logs </h2>
            <ul>
                <li>Logs all</li>
                <li>Logs medium</li>
                <li>Logs high</li>
            </ul>
            <p>Report by Kevin Molina</p>
            `,
            attachments: [
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
            ]
        }
        return await this.sendEmail(message);
    }
}