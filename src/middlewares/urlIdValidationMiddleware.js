import { urlIdSchema } from "../models/urlsModels.js";

export default async function urlIdValidation(req, res, next) {
    const { id } = req.params;

    const { value, error } = urlIdSchema.validate(
        { id },
        { abortEarly: false }
    );

    if (error !== undefined)
        return res
            .status(422)
            .send(error.details.map((detail) => detail.message));

    res.locals.id = value.id;

    next();
}
