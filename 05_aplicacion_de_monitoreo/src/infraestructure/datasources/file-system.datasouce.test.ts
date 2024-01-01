import fs from "fs";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { FileSystenDatasource } from "./file-system.datasouce";

describe("file-system.datasource.ts", () => {
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
    const directories = ["logs/", "logs-temp/"]
    const paths = ["logs-all.log", "logs-medium.log", "logs-high.log"].map(file => directories[0].concat(file));
    const pathsTemp = ["logs-all.log", "logs-medium.log", "logs-high.log"].map(file => directories[1].concat(file));

    const logsAsJson = logs.map(log => `${JSON.stringify(log)}\n`);

    const loadTestFiles = (from: string[], to: string[]) => {
        directories.forEach((dir) => {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        })
        from.forEach((path, index) => {
            const dataTemp = fs.readFileSync(path, "utf-8");
            fs.writeFileSync(to[index], dataTemp);
            fs.unlinkSync(path);
        });
        const dir = from[0].split("/")[0];
        fs.rmdirSync(dir);
    }

    beforeAll(() => {
        loadTestFiles(paths, pathsTemp);
    });

    afterAll(() => {
        loadTestFiles(pathsTemp, paths);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should save a log", () => {
        const datasource = new FileSystenDatasource();
        const fsMock = jest.spyOn(fs, "appendFileSync");
        logs.forEach((log, index) => {
            datasource.saveLog(log);
            expect(fsMock).toHaveBeenCalledWith(paths[index], logsAsJson[index]);
        });
        expect(fsMock).toHaveBeenCalled();
        expect(fsMock).toHaveBeenCalledTimes(5);
    });

    test("should get logs", async () => {
        const datasource = new FileSystenDatasource();
        const levels = [LogSeverityLevel.low, LogSeverityLevel.medium, LogSeverityLevel.high];

        for (const level of levels) {
            const logs = await datasource.getLogs(level);
            expect(logs[0].level).toBe(level);
        }
    });

    test("should be a error with a other level", async () => {
        const datasource = new FileSystenDatasource();
        const otherLevel = "MEGA-LEVEL" as LogSeverityLevel;
        try {
            await datasource.getLogs(otherLevel);
        } catch (error) {
            expect(`${error}`).toBe(`Error: ${otherLevel} not implemented.`);
        }
    });

})