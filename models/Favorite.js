const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    favoritable: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'favoritableModel'
    },

    favoritableModel: {
        type: String,
        required: true,
        enum: ['Routine', 'Meal', 'Workout']
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    comment: {
        type: String
    }
})

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema)