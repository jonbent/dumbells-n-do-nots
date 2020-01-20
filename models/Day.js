const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    routine: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Routine"
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = Day = mongoose.model("Day", DaySchema)