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
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

module.exports = Meal = mongoose.model("Meal", MealSchema)