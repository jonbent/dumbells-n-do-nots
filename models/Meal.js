const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    nutrients: {
        type: Object,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    userId: {
        type: Number
    }
})

module.exports = Meal = mongoose.model("Meal", MealSchema)