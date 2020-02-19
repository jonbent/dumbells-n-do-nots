import {connect} from 'react-redux';
import ExistingRoutine from "./ExistingRoutine";
import {fetchRoutineById} from "../../actions/RoutineActions";

const mapStateToProps = ({ui, entities}) => {
    const days = Object.values(entities.days).filter(day => day.routine === ui.routineFilters.selectedRoutine._id)
    return {
        routine: ui.routineFilters.selectedRoutine,
        days,
        meals: entities.meals,
        workouts: entities.workouts,
        exercises: entities.exercises

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoutine: id => dispatch(fetchRoutineById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingRoutine)