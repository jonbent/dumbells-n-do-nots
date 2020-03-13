import {connect} from 'react-redux';
import ExistingRoutine from "./ExistingRoutine";
import {fetchRoutineById} from "../../actions/RoutineActions";
import dateFormat from 'dateformat';
import {receiveNewRoutineStartDateWithData, submitRoutine, receiveRoutineErrors, submitEdit} from "../../actions/NewRoutineActions";
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";
import {receiveDaySelected} from "../../actions/RoutineFilterActions";
const mapStateToProps = ({ui, entities, errors}) => {
    const routineEdit = localStorage.getItem('routineEdit');
    const days = Object.values(entities.days).filter(day => day.routine === (routineEdit ? routineEdit : ui.routineFilters.selectedRoutine._id))

    let userMeals = {};
    days.forEach(d => d.meals.forEach(m => userMeals[m] = entities.userMeals[m]));


    return {
        routine: routineEdit ? entities.routines[routineEdit] : ui.routineFilters.selectedRoutine,
        routineId: routineEdit ? routineEdit : ui.routineFilters.selectedRoutine._id,
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
        receiveNewRoutineStartDateWithData: (day, data) => dispatch(receiveNewRoutineStartDateWithData({date: day ? dateFormat(day, 'mm/dd/yyyy') : null, data})),
        submitRoutine: (routine) => {return dispatch(submitRoutine(routine))},
        fetchRoutineByStartDate: (date, cb) => fetchRoutineByStartDate(date).then((res) => cb(date, res)).catch(err => {
            cb(date);
            dispatch(receiveRoutineErrors(err.response.data))
        }),
        submitEdit: (day, routineDay) => dispatch(submitEdit(day, routineDay)),
        receiveDaySelected: day => dispatch(receiveDaySelected(day))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExistingRoutine)