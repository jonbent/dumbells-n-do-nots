const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWorkoutSchema = new Schema({
    dayId: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    workoutId: {
        type: Number,
        required: true
    }
})

module.exports = UserWorkout = mongoose.model("UserWorkout", UserWorkoutSchema)