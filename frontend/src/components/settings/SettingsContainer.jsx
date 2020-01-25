import { connect } from "react-redux";
import Settings from './Settings';
import {fetchUser} from '../../actions/UserActions';
import {updateUser} from '../../actions/UserActions'

const mapStateToProps = state => ({
  user: state.session.user,
  errors: state.errors.session
});
const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    updateUser: (formData,username) => dispatch(updateUser(formData,username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
