const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

module.exports = Routine = mongoose.model("Routine", RoutineSchema)