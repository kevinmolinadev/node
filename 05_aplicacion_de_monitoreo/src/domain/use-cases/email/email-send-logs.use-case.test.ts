import { LogEntity } from "../../entities/log.entity";
import { EmailSendLogs } from "./email-send-logs.use-case";

describe("email-send-logs.use-case.ts", () => {
    const emailService = {
        sendEmail: jest.fn(),
        sendEmailWithLogsSystem: jest.fn().mockReturnValue(true)
    } as any

    const logRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const emailSendLogs = new EmailSendLogs(emailService, logRepository);

    test("should be successfull the method execute()", async () => {
        const to = "kevinmolina.dev@gmail.com";
        const sentEmail = await emailSendLogs.execute(to);

        expect(sentEmail).toBe(true);
        expect(emailService.sendEmailWithLogsSystem).toHaveBeenCalledWith(to);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

    test("should failed the method execute()", async () => {
        emailService.sendEmailWithLogsSystem.mockReturnValue(false);
        const to = "";
        const sentEmail = await emailSendLogs.execute(to);

        expect(sentEmail).toBe(false);
        expect(emailService.sendEmailWithLogsSystem).toHaveBeenCalledWith(to);
        expect(logRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({
            message: "Error: Error in sending the system logs",
            level: "high",
            origin: "email-send-logs.use-case.ts"
        }));
    });
})