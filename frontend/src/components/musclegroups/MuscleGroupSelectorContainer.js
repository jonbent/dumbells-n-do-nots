import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';
import {fetchAllExercises, fetchAllExercisesByMuscleGroup} from '../../actions/ExerciseActions';
import {receiveSelectedMuscleGroups, receiveSide} from "../../actions/RoutineFilterActions";

const mSTP = (state) => ({
        sex: state.session.user.sex,
        muscleGroups: state.entities.muscleGroups,
        exercises: state.entities.exercises,
        side: state.ui.routineFilters.side,
        selectableMuscleGroups: {
            Arms: state.ui.routineFilters.Arms,
            Legs: state.ui.routineFilters.Legs,
            Shoulders: state.ui.routineFilters.Shoulders,
            Calves: state.ui.routineFilters.Calves,
            Abs: state.ui.routineFilters.Abs,
            Chest: state.ui.routineFilters.Chest,
            Back: state.ui.routineFilters.Back,
        },
        hoverArms: state.ui.routineFilters.hoverArms,
        hoverLegs: state.ui.routineFilters.hoverLegs,
        hoverShoulders: state.ui.routineFilters.hoverShoulders,
        hoverCalves: state.ui.routineFilters.hoverCalves,
        hoverAbs: state.ui.routineFilters.hoverAbs,
        hoverChest: state.ui.routineFilters.hoverChest,
        hoverBack: state.ui.routineFilters.hoverBack,
        
})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
    fetchAllExercisesByMuscleGroup: () => dispatch(fetchAllExercises()),
    fetchAllExercisesByMuscleGroup1: ids => dispatch(fetchAllExercisesByMuscleGroup(ids)),
    selectMuscleGroup: muscleGroup => dispatch(receiveSelectedMuscleGroups(muscleGroup)),
    selectSide: side => dispatch(receiveSide(side))
})

export default connect(mSTP, mDTP)(MuscleGroupSelector);