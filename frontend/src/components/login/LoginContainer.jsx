import { connect } from 'react-redux';
import Login from './Login';
import { login } from '../../actions/SessionActions'

const mapStateToProps = (state, { location }) => ({
});

const mapDispatchToProps = dispatch => ({
    login: (formUser) => dispatch(login(formUser))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
