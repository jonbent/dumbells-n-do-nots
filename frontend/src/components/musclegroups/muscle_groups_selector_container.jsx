import { connect } from 'react-redux';
import MuscleGroupsSelector from './muscle_groups_selector';
import fetchMuscleGroups from '../../actions/MuscleGroupsAction';

const mSTP = (state) => ({
    
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups())
})

export default connect(mSTP, mDTP)(MuscleGroupsSelector);