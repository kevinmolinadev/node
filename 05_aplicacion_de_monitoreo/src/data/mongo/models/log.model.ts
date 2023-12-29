import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["low", "medium", "high"],
        required:true
    },
    origin: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

export const LogMongoModel = mongoose.model("logs", LogSchema);