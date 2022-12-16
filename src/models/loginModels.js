import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export default signUpSchema;
