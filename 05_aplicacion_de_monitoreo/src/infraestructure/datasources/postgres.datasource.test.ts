import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresDatasource, prisma } from "./postgres.datasource";

describe("postgres.datasource.ts", () => {
    const logs = [new LogEntity({
        message: "test message",
        level: LogSeverityLevel.low,
        origin: "file-system.datasource.ts"
    }), new LogEntity({
        message: "test message",
        level: LogSeverityLevel.medium,
        origin: "file-system.datasource.ts"
    }), new LogEntity({
        message: "test message",
        level: LogSeverityLevel.high,
        origin: "file-system.datasource.ts"
    })];

    afterAll(() => {
        prisma.$disconnect();
    })

    afterEach(async () => {
        await prisma.logPostgresModel.deleteMany();
        jest.clearAllMocks();
    })
    const datasource = new PostgresDatasource();
    test("should save a log", async () => {
        const modelSaveMock = jest.spyOn(prisma.logPostgresModel, "create");

        for (const log of logs) {
            await datasource.saveLog(log);

            expect(modelSaveMock).toHaveBeenCalled();
            expect(modelSaveMock).toHaveBeenCalledWith({ data: { ...log, level: log.level.toUpperCase() } });
        };
        expect(modelSaveMock).toHaveBeenCalledTimes(3);

    })

    test("should'nt save a log", async () => {
        const newLog = new LogEntity({
            message: "Test message",
            level: "" as LogSeverityLevel,
            origin: "postgres.datasource.test.ts"
        });

        try {
            await datasource.saveLog(newLog);
        } catch (error) {
            expect(`${error}`).toContain("Argument `level` is missing.");
        }
    })
    test("should return logs for severityLevel", async () => {
        const modelGetLogsMock = jest.spyOn(prisma.logPostgresModel, "findMany");

        for (const log of logs) {
            await datasource.saveLog(log);
            const logs = await datasource.getLogs(log.level);
            const level = log.level.toUpperCase();

            expect(modelGetLogsMock).toHaveBeenCalled();
            expect(modelGetLogsMock).toHaveBeenCalledWith({ where: { level } });

            expect(logs.length).toBe(1);
            expect(logs[0].level).toBe(level);
        };
        expect(modelGetLogsMock).toHaveBeenCalledTimes(3);
    });

    test("should return an empty array with values no defined", async () => {
        const level = "MEGA-LOW" as LogSeverityLevel;
        const logs = await datasource.getLogs(level);

        expect(logs.length).toBe(0);

    })
});