const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateExerciseInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    data.description = validText(data.description) ? data.description : '';
    data.muscleGroup = validText(data.muscleGroup) ? data.muscleGroup : '';
    data.numSets = validText(data.numSets) ? data.numSets : '';
    data.numReps = validText(data.numReps) ? data.numReps : '';
    data.interval = validText(data.interval) ? data.interval : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Exercise name is required';
    }

    // if (!Validator.isLength(data.description, { min: 5, max: 250 })) {
    //     errors.description = 'Description must be between 5 & 250 characters';
    // }
    //
    // if (Validator.isEmpty(data.description)) {
    //     errors.description = 'Description is required';
    // }
    
    // if (Validator.isEmpty(data.numSets)) {
    //     errors.numSets = 'Number of sets is required';
    // }
    //
    // if (!Validator.isInt(data.numSets)) {
    //     errors.numSets = 'Sets should be a number';
    // }

    if (Validator.isEmpty(data.muscleGroup)) {
        errors.muscleGroup = 'Muscle group is required';
    }
    
    // if (!Validator.isInt(data.muscleGroup)) {
    //     errors.muscleGroup = 'Please reference the muscle group id';
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}