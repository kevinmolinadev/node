import { createTransport, Transporter } from "nodemailer";

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
    private readonly transport: Transporter
    constructor(
        private readonly mailerService: string,
        private readonly mailerEmail: string,
        private readonly mailerKey: string,

    ) {
        this.transport = createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerKey
            }
        })
    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { from = this.mailerEmail, to, subject, html, attachments = [] } = options
        try {
            await this.transport.sendMail({
                from,
                to,
                subject,
                html,
                attachments
            })
            return true
        } catch (error) {
            return false;
        }
    }
}