const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    favoritableType: {
        type: String,
        required: true
    },
    favoritableId: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
})

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema)