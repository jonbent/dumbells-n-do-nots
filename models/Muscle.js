import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const MuscleSchema = new Schema({
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }],
    name: {
        type: String,
        required: true
    },
    apiId:{
        type: Number,
        required: true
    }
})

const Muscle = mongoose.model("Muscle", MuscleSchema)
export default Muscle;
