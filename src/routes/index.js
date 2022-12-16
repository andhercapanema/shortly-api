import { Router } from "express";
import loginRouter from "./loginRoutes.js";

const router = Router();
router.use(loginRouter);

export default router;
