import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 40
 *           example: "Vancouver Branch"
 *         address:
 *           type: string
 *           minLength: 4
 *           maxLength: 60
 *           example: "1300 Burrard St, Vancouver, BC, V6Z 2C7"
 *         phone:
 *           type: string
 *           pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
 *           example: "604-456-0022"
 */
export const createBranchSchema = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    address: Joi.string().min(4).max(60).required(),
    phone: Joi.string().regex(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/).required()
});