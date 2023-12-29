import mongoose from "mongoose";

interface MongoDatabaseOptions {
    mongoUrl: string,
    dbName: string
}

export class MongoDatabase {

    static async connect(options: MongoDatabaseOptions) {
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl, {
                dbName,
            })
            console.log("Mongo connected!");
        } catch (error) {
            console.log("Mongo connection refused!");
            throw new Error(`${error}`);
        }
    }
}