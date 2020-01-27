const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuscleSchema = new Schema({
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
    name: {
        type: String,
        required: true
    },
    apiId:{
        type: Number,
        required: true
    }
})

module.exports = Muscle = mongoose.model("Muscle", MuscleSchema)