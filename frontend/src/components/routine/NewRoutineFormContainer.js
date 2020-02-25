import { connect } from 'react-redux';
import NewRoutineForm from './NewRoutineForm';
import { createRoutine } from '../../actions/RoutineActions';
import {createMeal} from '../../actions/MealActions';
import {receiveNewRoutineStartDate, receiveRoutineErrors} from '../../actions/NewRoutineActions'
import { openModal, closeModal } from '../../actions/ModalActions';
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";

// import DateFormat from 'dateformat';


const mapStateToProps = (state) => {
    // const currentDate = new Date();
    // const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7)
    return { 
        routine: {
            user: state.session.user.id,
        },
        routineError: state.errors.routine,
        mealErrors: state.errors.meal
    }
};

const mapDispatchToProps = dispatch => ({
    createRoutine: routine => dispatch(createRoutine(routine)),
    receiveNewRoutineStartDate: routineStartDate => dispatch(receiveNewRoutineStartDate(routineStartDate)),
    openAddMealsFormModal: () => dispatch(openModal('addUserMeals')),
    closeRoutineModal: () => dispatch(closeModal()),
    fetchRoutineByStartDate: (date, cb) => fetchRoutineByStartDate(date).then((res) => cb(date, res)).catch(err => {
        cb(date);
        dispatch(receiveRoutineErrors(err.response.data))
    }),
    createMeal: mealForm => dispatch(createMeal(mealForm))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoutineForm);


