import {connect} from 'react-redux';
import ExerciseSelector from './ExerciseSelector'

const mapStateToProps = ({ui, entities}) => ({
    exercises: entities.exercises
});
const mapDispatchToProps = (dispatch) => ({
    fetchExercises: () => dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelector)