import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(402).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("dni").notEmpty().withMessage("dni is required"),
    body("password")
        .trim()
        .isLength({ min: 5, max: 22 })
        .withMessage("Password should be at least 6 characters"),
];
export const signupValidators = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().isEmail().withMessage("email is required"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map