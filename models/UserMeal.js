const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserMealSchema = new Schema({
    day: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Day"
    },
    meal: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Meal"
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    timeStamp: {
        type: Date
    },
    doneAmount: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = UserMeal = mongoose.model("UserMeal", UserMealSchema)