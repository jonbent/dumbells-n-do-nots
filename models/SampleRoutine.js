const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampleRoutineSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
})

module.exports = SampleRoutine = mongoose.model("SampleRoutine", SampleRoutineSchema)