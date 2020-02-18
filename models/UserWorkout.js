const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWorkoutSchema = new Schema({
    day: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Day"
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    doneCheck: {
        type: Boolean,
        default: false,
        required: true
    }
    // startTime: {
    //     type: Date,
    //     required: true
    // },
    // endTime: {
    //     type: Date,
    //     required: true
    // },
    // workout: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Workout"
    // }
})

module.exports = UserWorkout = mongoose.model("UserWorkout", UserWorkoutSchema)