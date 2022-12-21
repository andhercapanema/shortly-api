import { Router } from "express";
import getMyUrls from "../controllers/usersControllers.js";
import validateAuthorization from "../middlewares/validateAuthorizationMiddleware.js";
import loginRouter from "./loginRoutes.js";
import urlsRouter from "./urlsRoutes.js";

const router = Router();
router.use(loginRouter);
router.use("/urls", urlsRouter);
router.get("/users/me", validateAuthorization, getMyUrls);

export default router;
