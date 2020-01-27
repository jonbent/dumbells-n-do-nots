const Validator = require('validator');
const validText = require('./valid-text');

module.exports = (data) => {
    let errors = {};

    data.favoritableType = validText(data.favoritableType) ? data.favoritableType : '';
    data.favoritableId = validText(data.favoritableId) ? data.favoritableId : '';


    if (Validator.isEmpty(data.favoritableType)) {
        errors.favoritableType = 'Favoritable id is required';
    }
    if (Validator.isEmpty(data.favoritableId)) {
        errors.favoritableId = 'Favoritable type is required';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}