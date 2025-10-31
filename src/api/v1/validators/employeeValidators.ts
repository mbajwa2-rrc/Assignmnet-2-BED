import Joi from "joi";

export const createEmployeeSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).required(),
    branchId: Joi.number().integer().required()
});