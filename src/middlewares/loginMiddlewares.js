import signUpSchema from "../models/loginModels.js";

export async function signUpBodyValidation(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const signUpData = { name, email, password, confirmPassword };

    const { value, error } = signUpSchema.validate(signUpData, {
        abortEarly: false,
    });

    if (error !== undefined)
        return res
            .status(422)
            .send(error.details.map((detail) => detail.message));

    if (password !== confirmPassword)
        return res
            .status(422)
            .send({ message: "As senhas inseridas são diferentes!" });

    res.locals.signUpData = {
        name: value.name,
        email: value.email,
        password: value.password,
    };

    next();
}
