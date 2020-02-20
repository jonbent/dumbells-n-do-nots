import {connect} from 'react-redux';
import ExerciseSelector from './ExerciseSelector'
import {receiveRoutineExercise, submitRoutineAndCloseModal} from "../../actions/NewRoutineActions";
import {receiveDaySelected} from "../../actions/RoutineFilterActions";

const mapStateToProps = ({ui, entities}) => ({
    days: Object.keys(ui.newRoutineData),
    curRoutine: ui.newRoutineData,
    exerciseDays: Object.keys(ui.newRoutineData).filter(day => Object.keys(ui.newRoutineData[day].workout).length !== 0),
    day: ui.routineFilters.daySelected,
    exercises: entities.exercises,
    muscleGroups: entities.muscleGroups,
    selectedExercises: ui.newRoutineData[ui.routineFilters.daySelected].workout,
    selectedMuscleGroupIds: Object.values(entities.muscleGroups).filter(group => ui.routineFilters[group.name] === true).map(group => group._id)
});
const mapDispatchToProps = (dispatch) => ({
    receiveRoutineExercise: (payload) => dispatch(receiveRoutineExercise(payload)),
    receiveDaySelected: (day) => dispatch(receiveDaySelected(day)),
    submitRoutine: (routine) => dispatch(submitRoutineAndCloseModal(routine))

});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelector)