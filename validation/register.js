const Validator = require('validator');
const validText = require('./valid-text');
const passwordValidator = require('password-validator');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    const passwordSchema = new passwordValidator();

    passwordSchema
        .is().min(8)
        .is().max(75)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()

    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';
    data.sex = validText(data.sex) ? data.sex : '';
    data.weightStart = validText(data.weightStart) ? data.weightStart : '';
    data.weightCur = validText(data.weightCur) ? data.weightCur : '';
    data.height = validText(data.height) ? data.height : '';
    data.birthDate = validText(data.birthDate) ? data.birthDate : '';

    if (!Validator.isLength(data.sex, { min: 1, max: 1 })) {
        errors.sex = 'Sex must be a one letter Character';
    }
    if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (!Validator.isInt(data.weightStart)) {
        errors.weightStart = 'Starting Weight must be a valid number';
    }
    if (!Validator.isInt(data.height)) {
        errors.height = 'Height must be a valid number';
    }
    if (!Validator.toDate(data.birthDate)) {
        errors.birthDate = 'Birthday must be a valid Date';
    }


    passValid = passwordSchema.validate(data.password, { list: true })
    if (passValid.length) {
        errors.password = passValid;
    }

    if (data.password !== data.password2) {
        errors.password2 = "Confirmation password must match First Password.";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};