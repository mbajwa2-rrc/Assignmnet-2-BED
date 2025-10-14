import Joi from "joi";

export const createBranchSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    address: Joi.string().min(4).max(30).required(),
    phone: Joi.string().regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).required()
});