import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';

const mSTP = (state) => ({
    
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),

})

export default connect(mSTP, mDTP)(MuscleGroupSelector);