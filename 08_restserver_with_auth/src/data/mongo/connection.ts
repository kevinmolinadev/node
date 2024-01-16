import mongoose from "mongoose"

export class MongoDatabase {
    constructor(
        private readonly url: string,
        private readonly dbName: string
    ) { }

    async start() {
        try {
            await mongoose.connect(this.url, {
                dbName: this.dbName
            })
            console.log("Mongo Connected.");
        } catch (error) {
            //save a log
            throw error;
        }
    }

}