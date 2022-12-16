import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export const signInSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
});
