import {connect} from 'react-redux';
import RoutineShow from "./RoutineShow";
import { openModal } from '../../actions/ModalActions';
import dateFormat from 'dateformat'
const mapStateToProps = ({entities, session}) => {
    let curDate = new Date(dateFormat(new Date(), 'mm/dd/yyyy'));
    const dayValues = Object.values(entities.days);
    curDate = dayValues.find(day => new Date(day.date).getTime() === curDate.getTime());
    let curDates = [];

    if ( curDate ){
        const curRoutine = entities.routines[curDate.routine];
        curDates = dayValues.filter((day) => {
            return day.routine === curRoutine._id
        })
    }
    let curDayIdx = 0;
    const daysHash = {}
    curDates.forEach((el, idx) => {daysHash[el._id] = el; if (el._id === curDate._id) curDayIdx = idx;});

    return {
        user: session.user,
        routines: entities.routines,
        meals: entities.routineMeals,
        userMeals: entities.userMeals,
        exercises: entities.exercises,
        userWorkouts: entities.userWorkouts,
        days: curDates,
        daysHash,
        curDay: curDate,
        curDayIdx
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    openNewRoutineModal: () => dispatch(openModal('addRoutine')),
})
export default connect(mapStateToProps, mapDispatchToProps)(RoutineShow);