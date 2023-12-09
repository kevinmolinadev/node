import { buildLogger, logger as winston } from "../../src/plugins";

describe("plugins/logger", () => {
    test("buildLOgger should return a function logger ", () => {
        const logger = buildLogger("test");

        expect(typeof logger.log).toBe("function");
        expect(typeof logger.error).toBe("function");
    });
    test("logger.log should be call", () => {
        const loggerWinston = jest.spyOn(winston, 'log');
        const message = "test message";
        const service = "test service";
        const logger = buildLogger(service);

        logger.log(message);

        expect(loggerWinston).toHaveBeenCalled();
        expect(loggerWinston).toHaveBeenCalledTimes(1);
        expect(loggerWinston).toHaveBeenCalledWith(
            "info",
            expect.objectContaining({
                level: "info",
                message,
                service
            })
        );
    });
    test("logger.error should be call", () => {
        const loggerWinston = jest.spyOn(winston, 'error');
        const message = "test message";
        const service = "test service";
        const logger = buildLogger(service);

        logger.error(message);

        expect(loggerWinston).toHaveBeenCalled();
        expect(loggerWinston).toHaveBeenCalledTimes(1);
        expect(loggerWinston).toHaveBeenCalledWith(
            "error",
            expect.objectContaining({
                message,
                service
            })
        );
    });
})