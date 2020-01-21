const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMealInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.description = validText(data.description) ? data.description : '';
    data.nutrients = validText(data.nutrients) ? data.nutrients : '';
    data.prepTime = validText(data.prepTime) ? data.prepTime : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Meal name is required';
    }

    if (!Validator.isLength(data.description, {min: 5, max: 250})) {
        errors.description = 'Description must be between 5 & 250 characters';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is required';
    }

    if (Validator.isEmpty(data.nutrients)) {
        errors.nutrients = 'Nutrients field is required';
    }

    if (Validator.isEmpty(data.prepTime)) {
        errors.prepTime = 'Please choose a valid time period to prep the meal';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}