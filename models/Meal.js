const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    photoUrl: {
        type: String
    },
    prepTime: {
        type: Number,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
})

module.exports = Meal = mongoose.model("Meal", MealSchema)