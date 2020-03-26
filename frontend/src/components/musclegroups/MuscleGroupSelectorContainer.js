import { connect } from 'react-redux';
import MuscleGroupSelector from "./MuscleGroupSelector";
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';
import {fetchExercisesByMuscleGroups} from '../../actions/ExerciseActions';
import {receiveSelectedMuscleGroup, receiveSide, receiveSelectedMuscleGroups} from "../../actions/RoutineFilterActions";

const mSTP = (state) => ({
        daySelect: state.ui.newRoutineData,
        day: state.ui.routineFilters.daySelected,
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
    fetchExercisesByMuscleGroups: ids => dispatch(fetchExercisesByMuscleGroups(ids)),
    selectMuscleGroup: muscleGroup => dispatch(receiveSelectedMuscleGroup(muscleGroup)),
    selectMuscleGroups: muscleGroups => dispatch(receiveSelectedMuscleGroups(muscleGroups)),
    selectSide: side => dispatch(receiveSide(side)),
})

export default connect(mSTP, mDTP)(MuscleGroupSelector);