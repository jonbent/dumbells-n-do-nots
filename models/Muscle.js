const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuscleSchema = new Schema({
    exercises: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Exercise"
    }],
    name: {
        type: String,
        required: true
    }
})

module.exports = Muscle = mongoose.model("Muscle", MuscleSchema)