import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 40
 *           example: "Alice Johnson"
 *         position:
 *           type: string
 *           example: "Branch Manager"
 *         department:
 *           type: string
 *           example: "Management"
 *         email:
 *           type: string
 *           format: email
 *           example: "alice.johnson@pixell-river.com"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
 *           example: "604-555-0148"
 *         branchId:
 *           type: integer
 *           example: 1
 */
export const createEmployeeSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).required(),
    branchId: Joi.number().integer().required()
});