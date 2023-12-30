import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
    const options = {
        message: "test",
        level: LogSeverityLevel.low,
        origin: "log.entity.test.ts"
    }
    const log = new LogEntity(options);
    test("should be a object of LogEntity", () => {
        expect(log).toBeInstanceOf(LogEntity);
        expect(log).toEqual(expect.objectContaining(log));
    });

    test("should return a LogEntity the method fromJSON()", () => {
        const logAtJson = JSON.stringify(log);
        const logAtEntity = LogEntity.fromJSON(logAtJson);

        expect(logAtEntity).toBeInstanceOf(LogEntity);
    });

    test("should return a LogEntity the method fromObject()", () => {
        const logAtEntity = LogEntity.fromObject(log);

        expect(logAtEntity).toBeInstanceOf(LogEntity);
    });
})