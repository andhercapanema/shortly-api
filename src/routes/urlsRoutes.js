import { Router } from "express";
import { shortenUrl } from "../controllers/urlsControllers.js";
import schemaValidation from "../middlewares/validateSchemaMiddlewares.js";

const router = Router();

router.use(schemaValidation);

router.post("/shorten", shortenUrl);

export default router;
