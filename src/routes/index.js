import { Router } from "express";
import { getMostVisitedUrls } from "../controllers/urlsControllers.js";
import getMyUrls from "../controllers/usersControllers.js";
import validateAuthorization from "../middlewares/validateAuthorizationMiddleware.js";
import loginRouter from "./loginRoutes.js";
import urlsRouter from "./urlsRoutes.js";

const router = Router();
router.use(loginRouter);
router.use("/urls", urlsRouter);
router.get("/users/me", validateAuthorization, getMyUrls);
router.get("/ranking", getMostVisitedUrls);

export default router;
