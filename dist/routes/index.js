import { Router } from 'express';
import userRoutes from './user-routes.js';
import instituteRoutes from './institute-routes.js';
const appRouter = Router();
appRouter.use("/user", userRoutes); //dominio/api/v1/users
appRouter.use("/institute", instituteRoutes); //dominio/api/v1/users
export default appRouter;
//# sourceMappingURL=index.js.map