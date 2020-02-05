import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';
import {fetchAllExercises} from '../../actions/ExerciseActions';


const mSTP = (state) => ({
        sex: state.session.user.sex,
        muscleGroups: state.entities.muscleGroups,
        exercises: state.entities.exercises
        
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
    fetchAllExercisesByMuscleGroup: () => dispatch(fetchAllExercises())
})

export default connect(mSTP, mDTP)(MuscleGroupSelector);