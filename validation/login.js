const Validator = require('validator');
const passwordValidator = require('password-validator');
const validText = require('./valid-text');

module.exports = (data) => {
    let errors = {};

    const passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8)
        .is().max(75)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()

    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}