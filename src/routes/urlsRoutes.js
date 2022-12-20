import { Router } from "express";
import { getUrlById, shortenUrl } from "../controllers/urlsControllers.js";
import urlIdValidation from "../middlewares/urlIdValidationMiddleware.js";
import schemaValidation from "../middlewares/validateSchemaMiddleware.js";

const router = Router();

router.get("/:id", urlIdValidation, getUrlById);

router.use(schemaValidation);

router.post("/shorten", shortenUrl);

export default router;
