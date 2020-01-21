const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const muscleGroup = require('./MuscleGroup');

const ExerciseSchema = new Schema({
    workout: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Workout"
    },

    muscleGroup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MuscleGroup'
    },

    muscles: [{
        type: Schema.Types.ObjectId,
        ref: 'Muscle'
    }],

    name:{
        type: String,
        required: true
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