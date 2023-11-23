import mongoose from "mongoose";

import { IGrade, IInstitute } from "../types/types.js";
import { userSchema } from "./User.js";

const gradeSchema = new mongoose.Schema<IGrade>({
  grade: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  students: {
    type: [userSchema],
    required: true,
  },
});

const instituteSchema = new mongoose.Schema<IInstitute>({
  name: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  grades: [gradeSchema],
});

export default mongoose.model("Institute", instituteSchema);