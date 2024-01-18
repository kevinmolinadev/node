import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true
    },
    email_validated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    },
    img: {
        type: String,
        default: null
    },
    role: {
        type: [String],
        default: ["USER_ROLE"],
        enum: ["USER_ROLE", "ADMIN_ROLE"]
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
})

export const UserModel = mongoose.model("users", UserSchema);