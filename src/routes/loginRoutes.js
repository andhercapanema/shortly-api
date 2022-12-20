import { Router } from "express";
import { signUp, signIn } from "../controllers/loginControllers.js";
import schemaValidation from "../middlewares/validateSchemaMiddleware.js";

const router = Router();

router.post("/signup", schemaValidation, signUp);
router.post("/signin", schemaValidation, signIn);

export default router;
