import mongoose from 'mongoose';
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

const Day = mongoose.model("Day", DaySchema)
export default Day;
