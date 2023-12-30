import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check.use-case";
describe("check.use-case.ts", () => {
    const fileSystemlog = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    beforeEach(() => {
        jest.resetAllMocks();
    })
    test("should be successfull the method execute()", async () => {
        const checkService = new CheckService(fileSystemlog, successCallback, errorCallback);
        const isOk = await checkService.execute("https://google.com");

        expect(isOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();

        expect(fileSystemlog.saveLog).toHaveBeenCalled();
        expect(fileSystemlog.saveLog).toHaveBeenCalledTimes(1);
        expect(fileSystemlog.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });

    test("should failed the method execute()", async () => {
        const checkService = new CheckService(fileSystemlog, successCallback, errorCallback);
        const isOk = await checkService.execute("https://googlee.com");

        expect(isOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();

        expect(fileSystemlog.saveLog).toHaveBeenCalled();
        expect(fileSystemlog.saveLog).toHaveBeenCalledTimes(1);
        expect(fileSystemlog.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    });
})