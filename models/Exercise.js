const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    workoutId: {
        type: Number,
        required: true
    },
    muscleGroupIds: {
        type: Array,
        required: true
    },
    estCaloriesBurned: {
        type: Number
    },
    description: {
        type: String,
        required: true
    },
    numSets: {
        type: Number,
        required: true
    },
    numReps: {
        type: Number
    },
    //seconds
    interval: {
        type: Number
    }
})

module.exports = Exercise = mongoose.model("Exercise", ExerciseSchema)