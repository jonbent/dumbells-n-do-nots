import { connect } from "react-redux";
import Settings from './Settings';
import {fetchUser} from '../../actions/UserActions';
import {updateUser} from '../../actions/UserActions';
import { receiveErrors } from '../../actions/SessionActions';

const mapStateToProps = state => ({
  user: state.session.user,
  errors: state.errors.session
});
const mapDispatchToProps = dispatch => ({
    fetchUser: () => dispatch(fetchUser()),
    updateUser: (formData,username) => dispatch(updateUser(formData,username)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
