import { Router } from "express";
import { signUp, signIn } from "../controllers/loginControllers.js";
import schemaValidation from "../middlewares/validateSchemaMiddlewares.js";

const router = Router();

router.use(schemaValidation);

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
