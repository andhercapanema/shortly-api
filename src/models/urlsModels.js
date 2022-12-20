import joi from "joi";

export const urlSchema = joi.object({
    url: joi.string().uri().required().trim(),
});

export const urlIdSchema = joi.object({
    id: joi
        .string()
        .required()
        .pattern(/^[0-9]+$/),
});
