import { Router } from "express";
import loginRouter from "./loginRoutes.js";
import urlsRouter from "./urlsRoutes.js";

const router = Router();
router.use(loginRouter);
router.use("/urls", urlsRouter);

export default router;
