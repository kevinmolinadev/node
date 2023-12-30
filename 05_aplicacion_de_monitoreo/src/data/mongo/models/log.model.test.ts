import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogMongoModel } from "./log.model";

describe("log.model.ts", () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test("should return a object saved in mongo", async () => {
        const log = await LogMongoModel.create({
            message: "test message",
            level: "low",
            origin: "test model"
        });

        expect(log).toEqual(expect.objectContaining({
            ...log,
            createAt: expect.any(Date),
        }))

        await LogMongoModel.findByIdAndDelete(log.id);
    });

    test("should be  same schema definited", async () => {
        const schema = LogMongoModel.schema.obj;

        expect(schema).toEqual({
            message: { type: expect.any(Function), required: true },
            level: {
                type: expect.any(Function),
                enum: ['low', 'medium', 'high'],
                required: true
            },
            origin: { type: expect.any(Function), required: true },
            createAt: expect.any(Object)
        })
    })
})