const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const muscleGroup = require('./MuscleGroup');

const ExerciseSchema = new Schema({
    muscleGroup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'MuscleGroup'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
    },
    numSets: {
        type: Number,
        required: true
    },
    numReps: [{
        type: Number
    }],
    restTime: {
        type: Number
    },
    //seconds
    interval: {
        type: Number
    }
})

module.exports = Exercise = mongoose.model("Exercise", ExerciseSchema)