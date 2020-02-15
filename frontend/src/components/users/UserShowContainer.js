import {connect} from 'react-redux';
import UserShow from './UserShow'
import { fetchUser } from '../../actions/UserActions';
import { fetchUserRoutine } from '../../actions/RoutineActions';

const mapStateToProps = (state, ownProps) => {
    let user = state.session.user;
    if (ownProps.match.params.username) user = state.entities.users[ownProps.match.params.username];
    return { 
        user
    }   
};

const mapDispatchToProps = (dispatch, ownProps) => ({ 
    fetchUserInfo: (username) => dispatch(fetchUser(username)),
    fetchRoutineData: (userId) => dispatch(fetchUserRoutine(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserShow)