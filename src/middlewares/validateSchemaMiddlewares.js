import { signUpSchema, signInSchema } from "../models/loginModels.js";

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
    };

    const { body, schema } = handleRoute[req.url];

    const { value, error } = schema.validate(body, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(422)
            .send(error.details.map((detail) => detail.message));

    res.locals.validatedBody = value;

    next();
}
