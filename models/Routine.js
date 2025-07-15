import mongoose from 'mongoose';
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

const Routine = mongoose.model("Routine", RoutineSchema)
export default Routine;
