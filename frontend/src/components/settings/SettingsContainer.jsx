import { connect } from "react-redux";
import Settings from './Settings';
import {fetchUser} from '../../actions/UserActions';
import {updateUser} from '../../actions/UserActions'

const mapStateToProps = state => ({
  user: state.session.user
});
const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    updateUser: (formData) => dispatch(updateUser(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
