const Validator = require('validator');
const validText = require('./valid-text');

module.exports = (data) => {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.description = validText(data.description) ? data.description : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Workout name is required';
    }

    if (!Validator.isLength(data.description, { min: 5, max: 250 })) {
        errors.description = 'Description must be between 5 & 250 characters';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}