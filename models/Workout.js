const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    estCaloriesBurned: {
        type: Number
    }
})

module.exports = Workout = mongoose.model("Workout", WorkoutSchema)