import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
})
ProductSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret, options) {
        delete ret._id;
    },
})
export const ProductModel = mongoose.model("products", ProductSchema);