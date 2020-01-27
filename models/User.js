const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-beautiful-unique-validation');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
        uniqueCaseInsensitive: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        uniqueCaseInsensitive: true
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
        type: Date,
        required: true
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
    },
    routines: [
        {
            type: Schema.Types.ObjectId,
            ref: "Routine"
        }
    ],
    avatarUrl: {
        type: String
    }

})
UserSchema.plugin(uniqueValidator)

module.exports = User = mongoose.model('User', UserSchema);