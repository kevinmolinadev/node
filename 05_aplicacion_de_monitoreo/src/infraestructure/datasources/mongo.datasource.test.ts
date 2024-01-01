import mongoose from "mongoose";
import { LogMongoModel, MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoDatasource } from "./mongo.datasource";

describe("mongo.datasource.ts", () => {
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

    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    beforeEach(async () => {
        await LogMongoModel.deleteMany();
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    const datasource = new MongoDatasource();
    test("should save a log", async () => {

        const modelSaveMock = jest.spyOn(LogMongoModel, "create");

        for (const log of logs) {
            await datasource.saveLog(log);
            expect(modelSaveMock).toHaveBeenCalled();
            expect(modelSaveMock).toHaveBeenCalledWith(log);
        };
        expect(modelSaveMock).toHaveBeenCalledTimes(3);

    })
    test("should return logs for severityLevel", async () => {
        const modelGetLogsMock = jest.spyOn(LogMongoModel, "find");
        
        for (const log of logs) {
            await datasource.saveLog(log);
            const logs = await datasource.getLogs(log.level);

            expect(modelGetLogsMock).toHaveBeenCalled();
            expect(modelGetLogsMock).toHaveBeenCalledWith({ level: log.level });
            
            expect(logs.length).toBe(1);
            expect(logs[0].level).toBe(log.level);
        };
        expect(modelGetLogsMock).toHaveBeenCalledTimes(3);
    });

});