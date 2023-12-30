import { CheckServiceMultiple } from "./check-multiple.use-case";
import { LogEntity } from "../../entities/log.entity";
describe("check-multiple.use-case.ts", () => {
    const fileSystemlog = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mongoLog = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const postgresLog = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    beforeEach(() => {
        jest.resetAllMocks();
    })
    test("should be successfull the method execute()", async () => {
        const datasources = [fileSystemlog, mongoLog, postgresLog];
        const checkService = new CheckServiceMultiple(datasources, successCallback, errorCallback);
        const isOk = await checkService.execute("https://google.com");

        expect(isOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();

        datasources.forEach(datasource => {
            expect(datasource.saveLog).toHaveBeenCalled();
            expect(datasource.saveLog).toHaveBeenCalledTimes(1);
            expect(datasource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        })
    });

    test("should failed the method execute()", async () => {
        const datasources = [fileSystemlog, mongoLog, postgresLog];
        const checkService = new CheckServiceMultiple(datasources, successCallback, errorCallback);
        const isOk = await checkService.execute("https://googlee.com");

        expect(isOk).toBe(false);
        expect(errorCallback).toHaveBeenCalled();

        datasources.forEach(datasource => {
            expect(datasource.saveLog).toHaveBeenCalled();
            expect(datasource.saveLog).toHaveBeenCalledTimes(1);
            expect(datasource.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        })
    });
})