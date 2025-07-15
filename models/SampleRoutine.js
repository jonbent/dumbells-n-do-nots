import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SampleRoutineSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
})

const SampleRoutine = mongoose.model("SampleRoutine", SampleRoutineSchema)
export default SampleRoutine;
