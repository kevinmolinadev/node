import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("init.ts", () => {
    afterAll(() => {
        mongoose.connection.close();
    })
    test("should return conection sussces with default values", async () => {
        const logMock = jest.fn();
        console.log = logMock;
        const options = {
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        }

        await MongoDatabase.connect(options);

        expect(logMock).toHaveBeenCalled();
        expect(logMock).toHaveBeenCalledTimes(1);
        expect(logMock).toHaveBeenLastCalledWith("Mongo connected!");
    });

    test("should return a connection refused with other values", async () => {
        jest.resetAllMocks();
        jest.resetModules()
        const logMock = jest.fn();
        console.log = logMock;
        const options = {
            mongoUrl: "mongodb://test:test@localhost:27017",
            dbName: "TEST"
        }

        try {
            await MongoDatabase.connect(options);
        } catch (error) {
            expect(logMock).toHaveBeenCalled();
            expect(logMock).toHaveBeenLastCalledWith("Mongo connection refused!");
        }
    });

})