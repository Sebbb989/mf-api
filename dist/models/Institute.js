import mongoose from "mongoose";
import { userSchema } from "./User.js";
const gradeSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    currentlyEnrolled: {
        type: Number,
        required: true,
    },
    students: {
        type: [userSchema],
        required: true,
    },
});
const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    minGrade: {
        type: Number,
        required: true,
    },
    maxGrade: {
        type: Number,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    grades: [gradeSchema],
});
export default mongoose.model("Institute", instituteSchema);
//# sourceMappingURL=Institute.js.map