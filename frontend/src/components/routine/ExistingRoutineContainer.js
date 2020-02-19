import {connect} from 'react-redux';
import ExistingRoutine from "./ExistingRoutine";
import {fetchRoutineById} from "../../actions/RoutineActions";
import dateFormat from 'dateformat';
import {receiveNewRoutineStartDateWithData, submitRoutine} from "../../actions/NewRoutineActions";
const mapStateToProps = ({ui, entities}) => {
    const days = Object.values(entities.days).filter(day => day.routine === ui.routineFilters.selectedRoutine._id)
    let userMeals = {};
    days.forEach(d => d.meals.forEach(m => userMeals[m] = entities.userMeals[m]));
    return {
        routine: ui.routineFilters.selectedRoutine,
        days,
        meals: entities.meals,
        userMeals: userMeals,
        workouts: entities.workouts,
        exercises: entities.exercises,
        submitableRoutine: ui.newRoutineData

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoutine: id => dispatch(fetchRoutineById(id)),
        receiveNewRoutineStartDateWithData: (day, data) => dispatch(receiveNewRoutineStartDateWithData({date: dateFormat(day, 'yyyy-mm-dd'), data})),
        submitRoutine: (routine) => dispatch(submitRoutine(routine))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingRoutine)