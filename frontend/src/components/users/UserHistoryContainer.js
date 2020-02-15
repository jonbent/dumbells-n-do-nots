import {connect} from 'react-redux';
import UserHistory from './UserHistory'
import {fetchUserRoutines} from "../../actions/RoutineActions";
import {fetchUser} from "../../actions/UserActions";
const mapStateToProps = ({session, entities}, ownProps) => {
    let routineDays = {};
    Object.values(entities.days).forEach(d => routineDays[d.routine] ? routineDays[d.routine].push(d) : routineDays[d.routine] = [d])
    return {
        currentUser: session.user,
        user: entities.users[ownProps.match.params.username],
        routines: entities.users[ownProps.match.params.username] ? Object.values(entities.routines).filter(r => r.user === entities.users[ownProps.match.params.username]._id) : [],
        days: routineDays,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUserRoutines: userId => dispatch(fetchUserRoutines(userId)),
        fetchUserInfo: () => dispatch(fetchUser(ownProps.match.params.username)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserHistory)