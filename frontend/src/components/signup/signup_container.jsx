import { connect } from 'react-redux';
import Signup from './signup';
import { signup } from '../../actions/SessionActions';
import { receiveNextStep } from '../../actions/FilterActions'

const mapStateToProps = (state) => ({
    step: state.ui.filters.currentStep
});

const mapDispatchToProps = dispatch => ({
    signup: userForm => dispatch(signup(userForm)),
    receiveNextStep: num => dispatch(receiveNextStep(num))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);
