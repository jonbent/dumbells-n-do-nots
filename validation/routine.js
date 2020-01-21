const Validator = require('validator');
const validText = require('./valid-text');

module.exports = (data) => {
    let errors = {};

    data.user = validText(data.user) ? data.user : '';
    data.startDate = validText(data.startDate) ? data.startDate : '';
    data.endDate = validText(data.endDate) ? data.endDate : '';
    
    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = 'Start date is required';
    }

    if (!Validator.toDate(data.startDate)) {
        errors.startDate = 'Start date must be a valid Date';
    }
    
    if (Validator.isEmpty(data.endDate)) {
        errors.endDate = 'End date is required';
    }

    if (!Validator.toDate(data.endDate)) {
        errors.endDate = 'End date must be a valid Date';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}