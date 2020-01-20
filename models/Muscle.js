const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuscleSchema = new Schema({
    muscleGroup: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "MuscleGroup"
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Muscle = mongoose.model("Muscle", MuscleSchema)