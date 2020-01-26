import {connect} from 'react-redux';
import ExerciseSelector from './ExerciseSelector'

const mapStateToProps = ({ui, entities}) => ({

});
const mapDispatchToProps = (dispatch) => ({
    fetchExercises: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelector)