import {connect} from 'react-redux';
import ExerciseSelector from './ExerciseSelector'
import {receiveRoutineExercise, submitRoutineAndCloseModal} from "../../actions/NewRoutineActions";
import {receiveDaySelected} from "../../actions/RoutineFilterActions";
import {fetchUserRoutine, toggleExercise} from "../../actions/RoutineActions";

const mapStateToProps = ({ui, entities, session}, ownProps) => {
    const dayKeys = Object.keys(ui.newRoutineData);
    let user = session.user;
    if (ownProps.single === true) {
        // ownProps.day.workout ?
        // ownProps.day.workout.map(exId => entities.exercises[exId])
        const selectedExercises = ownProps.day && entities.workouts[ownProps.day.workout] ? entities.workouts[ownProps.day.workout].exercises : [];
        let selectedMuscleGroupIds = new Set();
        let selectedExercisesHash = {};
        selectedExercises.forEach(exId => {
            if (!selectedMuscleGroupIds.has(entities.exercises[exId].muscleGroup)) selectedMuscleGroupIds.add(entities.exercises[exId].muscleGroup)
            selectedExercisesHash[exId] = true;
        });

        selectedMuscleGroupIds = Array.from(selectedMuscleGroupIds);
        selectedMuscleGroupIds = Object.values(entities.muscleGroups).filter(group => ui.routineFilters[group.name] === true).map(group => group._id).concat(selectedMuscleGroupIds)
        let selectedMuscleGroupIdHash = {};
        selectedMuscleGroupIds.forEach(el => selectedMuscleGroupIdHash[el] = true);
        return {
            user,
            days: entities.days,
            selectedExercises: selectedExercisesHash,
            exercises: entities.exercises,
            muscleGroups: entities.muscleGroups,
            selectedMuscleGroupIds: Object.keys(selectedMuscleGroupIdHash)
        }
    } else {
        return {
            user,
            days: dayKeys,
            curRoutine: ui.newRoutineData,
            exerciseDays: dayKeys.filter(day => Object.keys(ui.newRoutineData[day].workout).length !== 0),
            day: ui.routineFilters.daySelected,
            exercises: entities.exercises,
            muscleGroups: entities.muscleGroups,
            selectedExercises: ui.newRoutineData[ui.routineFilters.daySelected].workout,
            selectedMuscleGroupIds: Object.values(entities.muscleGroups).filter(group => ui.routineFilters[group.name] === true).map(group => group._id)
        }

    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    if (ownProps.single === true) {
        return {
            receiveRoutineExercise: options => dispatch(toggleExercise(options.day._id, options.exerciseId))
        }
    } else {
        return {
            receiveRoutineExercise: (payload) => dispatch(receiveRoutineExercise(payload)),
            receiveDaySelected: (day) => dispatch(receiveDaySelected(day)),
            submitRoutine: (routine, userId) => dispatch(submitRoutineAndCloseModal(routine)).then(() => dispatch(fetchUserRoutine(userId)))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelector)