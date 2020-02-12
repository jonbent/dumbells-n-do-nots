import {connect} from 'react-redux';
import RoutineShow from "./RoutineShow";

const mapStateToProps = ({entities, session}) => ({
    user: session.user,
    routines: entities.routines,
    meals: entities.routineMeals,
    userMeals: entities.userMeals,
    exercises: entities.exercises,
    userWorkouts: entities.userWorkouts,
    days: entities.days
});

const mapDispatchToProps = (dispatch, ownProps) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(RoutineShow);