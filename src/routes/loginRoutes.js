import { Router } from "express";
import { signUp } from "../controllers/loginControllers.js";
import { signUpBodyValidation } from "../middlewares/loginMiddlewares.js";

const router = Router();

router.post("/signup", signUpBodyValidation, signUp);

export default router;
