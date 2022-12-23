import { signUpSchema, signInSchema } from "../models/loginModels.js";
import { urlIdSchema, urlSchema } from "../models/urlsModels.js";

export default async function schemaValidation(req, res, next) {
    const handleRoute = {
        "/signup": {
            body: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
            },
            schema: signUpSchema,
        },
        "/signin": {
            body: {
                email: req.body.email,
                password: req.body.password,
            },
            schema: signInSchema,
        },
        "/shorten": {
            body: {
                url: req.body.url,
            },
            schema: urlSchema,
        },
        "/:id": {
            body: {
                id: req.params.id,
            },
            schema: urlIdSchema,
        },
    };

    const { body, schema } = handleRoute[req.route.path];

    const { value, error } = schema.validate(body, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(422)
            .send({ message: error.details.map((detail) => detail.message) });

    res.locals.validatedBody = value;

    next();
}
