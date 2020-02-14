import { connect } from 'react-redux';
import BottomNavBar from './BottomNavBar';
import { openModal } from '../../actions/ModalActions';
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
    modal: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
    openNewRoutineModal: () => dispatch(openModal('addRoutine')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BottomNavBar))