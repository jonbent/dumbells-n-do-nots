const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timeStamp: {
        type: Date,
        required: true,
    }
})

module.exports = Workout = mongoose.model("Workout", WorkoutSchema)