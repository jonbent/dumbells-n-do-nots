import { connect } from 'react-redux';
import NewRoutineForm from './NewRoutineForm';
import { createRoutine } from '../../actions/RoutineActions';
import { receiveNewRoutineStartDate } from '../../actions/NewRoutineActions'
import { openModal, closeModal } from '../../actions/ModalActions';

// import DateFormat from 'dateformat';


const mapStateToProps = (state) => {
    // const currentDate = new Date();
    // const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7)
    return { 
        routine: {
            user: state.session.user.id,
        }
    }
};

const mapDispatchToProps = dispatch => ({
    createRoutine: routine => dispatch(createRoutine(routine)),
    receiveNewRoutineStartDate: routineStartDate => dispatch(receiveNewRoutineStartDate(routineStartDate)),
    openAddMealsFormModal: () => dispatch(openModal('addUserMeals')),
    closeRoutineModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoutineForm);


