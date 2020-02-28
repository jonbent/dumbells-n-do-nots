import { connect } from 'react-redux';
import NewRoutineForm from './NewRoutineForm';
import { createRoutine } from '../../actions/RoutineActions';
import {createMeal} from '../../actions/MealActions';
import {receiveNewRoutineStartDate, receiveRoutineErrors} from '../../actions/NewRoutineActions'
import { openModal, closeModal } from '../../actions/ModalActions';
import {fetchRoutineByStartDate} from "../../util/RoutineApiUtil";
import {receiveAlert} from "../../actions/AlertActions";
import {fetchMuscleGroups} from "../../actions/MuscleGroupActions";
import {createExercise} from "../../actions/ExerciseActions";

// import DateFormat from 'dateformat';


const mapStateToProps = (state) => {
    // const currentDate = new Date();
    // const weekFromCurrentDate = currentDate.setDate(currentDate.getDate() + 7)
    return { 
        routine: {
            user: state.session.user.id,
        },
        routineError: state.errors.routine,
        mealErrors: state.errors.meal,
        exerciseErrors: state.errors.exercise,
        muscleGroups: state.entities.muscleGroups
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
    createMeal: mealForm => {
        return dispatch(createMeal(mealForm)).then((res) => {
            dispatch(closeModal());
            dispatch(receiveAlert({message: "Meal created successfully.", status: "success"}));
        }).catch((err) => {
            dispatch(receiveAlert({message: err, status: "fail"}));
        })
    },
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
    createExercise: formExercise => dispatch(createExercise(formExercise)).then(res => {
        dispatch(closeModal());
        dispatch(receiveAlert({message: "Exercise created successfully.", status: "success"}));
    }).catch(err => {
        dispatch(receiveAlert({message: err, status: "fail"}));
    })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewRoutineForm);


