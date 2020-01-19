const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserMealSchema = new Schema({
    dayId: {
        type: Number,
        required: true
    },
    mealId: {
        type: Number,
        required: true
    }
})

module.exports = UserMeal = mongoose.model("UserMeal", UserMealSchema)