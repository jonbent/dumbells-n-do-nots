import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';
import {fetchAllExercisesByMuscleGroup} from '../../actions/ExerciseActions';


const mSTP = (state) => ({
        sex: state.session.user.sex
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
    fetchAllExercisesByMuscleGroup: ids => dispatch(fetchAllExercisesByMuscleGroup(ids))
})

export default connect(mSTP, mDTP)(MuscleGroupSelector);