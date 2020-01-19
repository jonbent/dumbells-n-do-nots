const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuscleSchema = new Schema({
    muscleGroupId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Muscle = mongoose.model("Muscle", MuscleSchema)