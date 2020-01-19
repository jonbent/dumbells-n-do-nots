const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    userId: {
        type: Number,
        required: true
    }
})

module.exports = Routine = mongoose.model("Routine", RoutineSchema)