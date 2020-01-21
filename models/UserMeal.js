const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserMealSchema = new Schema({
    routine: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Routine"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    day: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Day"
    },
    meal: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Meal"
    }
})

module.exports = UserMeal = mongoose.model("UserMeal", UserMealSchema)