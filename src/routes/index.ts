import { Router } from 'express'
import userRoutes from './user-routes.js';

const appRouter = Router();


appRouter.use("/user", userRoutes) //dominio/api/v1/users


export default appRouter
