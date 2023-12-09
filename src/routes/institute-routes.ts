import { Router } from "express";
import {
    enrollClassroom,
  getAllInstitutes,
} from "../controllers/institute-controllers.js";
import {
  validate,
  signupValidators,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const instituteRoutes = Router();

instituteRoutes.get("/", getAllInstitutes);
instituteRoutes.post("/enroll", enrollClassroom);

export default instituteRoutes;
