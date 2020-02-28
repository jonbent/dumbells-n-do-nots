const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    days: [{
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }]
});

module.exports = Routine = mongoose.model("Routine", RoutineSchema)