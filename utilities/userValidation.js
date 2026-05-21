const { body, validationResult } = require('express-validator');
const contactValidationRules = () => {
    return [
        body('firstName')
            .isLength({ min: 2 })
            .withMessage('The first name must be at least 2 characters')
            .isString()
            .withMessage('The first name must be a string'),
        body('lastName')
            .isLength({ min: 3 })
            .withMessage('The last name must be at least 2 characters')
            .isString()
            .withMessage('The last name must be a string'),
        body('email')
            .isEmail()
            .withMessage('The email must be an email example: (username@email.com'),
        body('favColor')
            .isLength({ min: 2})
            .withMessage('The favorite color must be at least 2 characters')
            .isString()
            .withMessage('The favorite color must be a string'),
        body('birthday')
            .isDate()
            .withMessage('The birthday must be a date (YYYY-MM-DD)')
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next()
    };

    console.log('Full error object:', JSON.stringify(errors.array(), null, 2)); // Debug

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    
    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = { contactValidationRules, validate }