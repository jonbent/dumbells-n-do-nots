import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const MuscleGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    apiId:{
        type: Number,
        required: true
    }
})
const MuscleGroup = mongoose.model("MuscleGroup", MuscleGroupSchema)
export default  MuscleGroup;
