import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dni: {
        type: String,
        required: true,
        unique: true,
    },
    dniImage: {
        type: String,
        required: true,
    },
    parents: {
        type: String,
        required: true,
    },
    credits: {
        type: String,
        required: true,
    },
    healthCertificate: {
        type: String,
        required: true,
    },
    isForeign: {
        type: Boolean,
        required: true,
    },
    migratoryPermit: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEnrolled: {
        type: Boolean,
    },
    enrollNumber: {
        type: String,
    }
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map