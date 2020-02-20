import {connect} from 'react-redux';
import ExistingRoutine from "./ExistingRoutine";
import {fetchRoutineById} from "../../actions/RoutineActions";
import dateFormat from 'dateformat';
import {receiveNewRoutineStartDateWithData, submitRoutine, receiveRoutineErrors} from "../../actions/NewRoutineActions";
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";
import {receiveDaySelected} from "../../actions/RoutineFilterActions";
const mapStateToProps = ({ui, entities, errors}) => {
    const days = Object.values(entities.days).filter(day => day.routine === ui.routineFilters.selectedRoutine._id)
    let userMeals = {};
    days.forEach(d => d.meals.forEach(m => userMeals[m] = entities.userMeals[m]));
    return {
        routine: ui.routineFilters.selectedRoutine,
        days,
        dayKeys: Object.keys(ui.newRoutineData),
        meals: entities.meals,
        userMeals: userMeals,
        workouts: entities.workouts,
        exercises: entities.exercises,
        submitableRoutine: ui.newRoutineData,
        daySelected: ui.routineFilters.daySelected,
        routineError: errors.routine
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRoutine: id => dispatch(fetchRoutineById(id)),
        receiveNewRoutineStartDateWithData: (day, data) => dispatch(receiveNewRoutineStartDateWithData({date: dateFormat(day, 'yyyy-mm-dd'), data})),
        submitRoutine: (routine) => dispatch(submitRoutine(routine)),
        fetchRoutineByStartDate: (date, cb) => fetchRoutineByStartDate(date).then((res) => cb(date, res)).catch(err => {
            cb(date);
            dispatch(receiveRoutineErrors(err.response.data))
        }),
        receiveDaySelected: day => dispatch(receiveDaySelected(day))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingRoutine)