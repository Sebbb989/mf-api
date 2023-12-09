import { Router } from "express";
import { enrollClassroom, getAllInstitutes, } from "../controllers/institute-controllers.js";
const instituteRoutes = Router();
instituteRoutes.get("/", getAllInstitutes);
instituteRoutes.post("/enroll", enrollClassroom);
export default instituteRoutes;
//# sourceMappingURL=institute-routes.js.map