import {connect} from 'react-redux';
import RoutineShow from "./RoutineShow";
import { openModal } from '../../actions/ModalActions';
import dateFormat from 'dateformat'
const mapStateToProps = ({entities, session}) => ({
    user: session.user,
    routines: entities.routines,
    meals: entities.routineMeals,
    userMeals: entities.userMeals,
    exercises: entities.exercises,
    userWorkouts: entities.userWorkouts,
    days: Object.values(entities.days)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    openNewRoutineModal: () => dispatch(openModal('addRoutine')),
})
export default connect(mapStateToProps, mapDispatchToProps)(RoutineShow);