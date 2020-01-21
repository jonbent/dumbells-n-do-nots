const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserWorkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    day: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Day"
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    workout: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Workout"
    }
})

module.exports = UserWorkout = mongoose.model("UserWorkout", UserWorkoutSchema)