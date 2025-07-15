import Validator from 'validator';
import validText from './valid-text.js';

const loginValidator = (data) => {
    let errors = {};

    data.email = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
export default loginValidator
