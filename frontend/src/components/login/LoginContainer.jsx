import { connect } from 'react-redux';
import Login from './Login';
import { login, resetErrors } from '../../actions/SessionActions'

const mapStateToProps = (state, { location }) => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: (formUser) => dispatch(login(formUser)),
    resetErrors: () => dispatch(resetErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
