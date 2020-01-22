import {connect} from 'react-redux';
import UserShow from './UserShow'
const mapStateToProps = state => ({ 
    user: state.session.user 
});
export default connect(mapStateToProps, null)(UserShow)