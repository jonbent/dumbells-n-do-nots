const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    birthDate: {
        type: Date
    },
    // pounds
    weightStart: {
        type: Number,
        required: [true, "A starting weight must be present."]
    },

    weightCur: {
        type: Number,
        required: true
    },

    weightGoal: {
        type: Number
    },
    // inches
    height: {
        type: Number,
        required: [true, "Height must be provided"]
    },

    sex: {
        type: String,
        required: [true, "Sex must be provided"]
    },
    
    goalPath: {
        type: Number
    }
})

module.exports = User = mongoose.model('User', UserSchema);