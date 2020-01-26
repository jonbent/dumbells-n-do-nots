import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';
import {fetchAllExercisesByMuscleGroup} from '../../actions/ExerciseActions';


const mSTP = (state) => ({
    
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
    fetchAllExercisesByMuscleGroup: () =>dispatch(fetchAllExercisesByMuscleGroup())
})

export default connect(mSTP, mDTP)(MuscleGroupSelector);