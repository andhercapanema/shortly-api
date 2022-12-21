import { Router } from "express";
import {
    deleteUrl,
    getUrlById,
    openUrl,
    shortenUrl,
} from "../controllers/urlsControllers.js";
import urlExistsValidation from "../middlewares/urlExistsValidationMiddleware.js";
import urlIdValidation from "../middlewares/urlIdValidationMiddleware.js";
import urlOwnerValidation from "../middlewares/urlOwnerValidationMiddleware.js";
import validateAuthorization from "../middlewares/validateAuthorizationMiddleware.js";
import schemaValidation from "../middlewares/validateSchemaMiddleware.js";

const router = Router();

router.get("/:id", urlIdValidation, urlExistsValidation, getUrlById);
router.get("/open/:shortUrl", urlExistsValidation, openUrl);

router.use(validateAuthorization);

router.post("/shorten", schemaValidation, shortenUrl);
router.delete(
    "/:id",
    urlIdValidation,
    urlExistsValidation,
    urlOwnerValidation,
    deleteUrl
);

export default router;
