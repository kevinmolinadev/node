import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
})
CategorySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        delete ret._id;
    },
})
export const CategoryModel = mongoose.model("categories", CategorySchema);