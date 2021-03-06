const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MuscleGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    apiId:{
        type: Number,
        required: true
    }
})

module.exports = MuscleGroup = mongoose.model("MuscleGroup", MuscleGroupSchema)