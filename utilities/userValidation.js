const { body, validationResult } = require('express-validator');
const contactValidationRules = () => {
    return [
        body('firstName')
            .isLength({ min: 2 })
            .isString(),
        body('lastName')
            .isLength({ min: 3 })
            .isString(),
        body('email')
            .isEmail(),
        body('favColor')
            .isLength({ min: 2})
            .isString(),
        body('birthday')
            .isDate()
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    };

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    
    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = { contactValidationRules, validate }