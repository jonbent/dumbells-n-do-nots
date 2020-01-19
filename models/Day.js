const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    routineId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = Day = mongoose.model("Day", DaySchema)