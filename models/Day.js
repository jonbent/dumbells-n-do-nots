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
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal'
    }],
    workout: {
        type: Schema.Types.ObjectId,
        ref: 'Workout'
    }
});

module.exports = Day = mongoose.model("Day", DaySchema)