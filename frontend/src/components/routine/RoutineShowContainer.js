import {connect} from 'react-redux';
import RoutineShow from "./RoutineShow";
import { openModal } from '../../actions/ModalActions';
import dateFormat from 'dateformat'
const mapStateToProps = ({entities, session}) => {
    let curDate = new Date(dateFormat(new Date(), 'yyyy-mm-dd'));
    curDate.setDate(curDate.getDate() + 1);

    const dayValues = Object.values(entities.days);
    curDate = dayValues.find(day => new Date(day.date).getTime() === curDate.getTime());
    let curDates = [];
    if ( curDate ){
        const curRoutine = entities.routines[curDate.routine];
        curDates = dayValues.filter(day => day.routine === curRoutine._id)
    }

    return {
        user: session.user,
        routines: entities.routines,
        meals: entities.routineMeals,
        userMeals: entities.userMeals,
        exercises: entities.exercises,
        userWorkouts: entities.userWorkouts,
        days: curDates,
        curDay: curDate
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    openNewRoutineModal: () => dispatch(openModal('addRoutine')),
})
export default connect(mapStateToProps, mapDispatchToProps)(RoutineShow);