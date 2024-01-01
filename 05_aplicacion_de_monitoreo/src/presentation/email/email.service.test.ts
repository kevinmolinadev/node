import nodemailer from "nodemailer";
import { EmailService } from "./email.service";
import { envs } from "../../config/plugins/envs.plugin";

describe("email.service.ts", () => {
    const sendMock = jest.fn();
    const transMock = jest.fn();
    nodemailer.createTransport = transMock.mockReturnValue({
        sendMail: sendMock
    })

    const emailService = new EmailService();

    const message = {
        to: "test123@gmail.com",
        subject: "test message",
        html: `
            <h1>Test message</h1>
        `
    }
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should sendEmail", async () => {

        await emailService.sendEmail(message);

        expect(transMock).toHaveBeenCalled();
        expect(transMock).toHaveBeenCalledWith({
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_EMAIL_KEY
            },
            service: envs.MAILER_SERVICE
        });
        
        //sendEmail
        expect(sendMock).toHaveBeenCalledTimes(1);
        expect(sendMock).toHaveBeenCalledWith({
            ...message,
            from: envs.MAILER_EMAIL,
            attachments: expect.any(Array)
        });
    });

    test("should a error with sendEmail", async () => {
        sendMock.mockImplementation(() => {
            throw new Error();
        });
        const emailSent = await emailService.sendEmail(message);
        
        expect(emailSent).toBe(false);
    });

    test("should sendEmailWithLogsSystem", async () => {
        const users = ["test1@gmail.com", "test2@gmail.com"];
        await emailService.sendEmailWithLogsSystem(users);

        expect(sendMock).toHaveBeenCalledWith({
            from:envs.MAILER_EMAIL,
            to: users,
            subject: "System logs report",
            html: expect.any(String),
            attachments: [
                { filename: "logs-all.log", path: "./logs/logs-all.log" },
                { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
                { filename: "logs-high.log", path: "./logs/logs-high.log" },
            ]
        });
    })
})