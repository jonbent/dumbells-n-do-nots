import { connect } from 'react-redux';
import BottomNavBar from './BottomNavBar';
import { openModal } from '../../actions/ModalActions';

const mapStateToProps = state => ({
    modal: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
    openNewRoutineModal: () => dispatch(openModal('addRoutine'))
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar)