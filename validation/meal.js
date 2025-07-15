import Validator from 'validator';
import validText from './valid-text.js';

const validateMealInput = (data) => {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';
    data.calories = validText(data.calories) ? data.calories : '';
    data.protein = validText(data.protein) ? data.protein : '';
    data.carbs = validText(data.carbs) ? data.carbs : '';
    data.fat = validText(data.fat) ? data.fat : '';
    data.prepTime = validText(data.prepTime) ? data.prepTime : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }
    //
    // if (!Validator.isLength(data.description, {min: 5, max: 250})) {
    //     errors.description = 'Description must be between 5 & 250 characters';
    // }
    //
    // if (Validator.isEmpty(data.description)) {
    //     errors.description = 'Description is required';
    // }
    //
    // if (Validator.isEmpty(data.calories)) {
    //     errors.calories = 'calories field is required';
    // }

    if (Validator.isEmpty(data.protein)) {
        errors.protein = 'protein field is required';
    }

    if (Validator.isEmpty(data.fat)) {
        errors.fat = 'fat field is required';
    }

    if (Validator.isEmpty(data.carbs)) {
        errors.carbs = 'carbs field is required';
    }

    // if (Validator.isEmpty(data.prepTime)) {
    //     errors.prepTime = 'Please choose a valid time period to prep the meal';
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
export default validateMealInput;
