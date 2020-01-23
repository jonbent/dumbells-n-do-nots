import {connect} from 'react-redux';
import UserShow from './UserShow'
// import 
const mapStateToProps = state => ({ 
    user: state.session.user 
});
// const mapDispatchToProps = state => ({ 
//     fetchUserInfo: 
// });
export default connect(mapStateToProps, null)(UserShow)