import { connect } from 'react-redux';
import Signup from './signup';
import { signup, resetErrors } from '../../actions/SessionActions';
import { receiveNextStep } from '../../actions/FilterActions'

const mapStateToProps = (state) => ({
    step: state.ui.filters.currentStep,
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    signup: userForm => dispatch(signup(userForm)),
    receiveNextStep: num => dispatch(receiveNextStep(num)),
    resetErrors: () => dispatch(resetErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
