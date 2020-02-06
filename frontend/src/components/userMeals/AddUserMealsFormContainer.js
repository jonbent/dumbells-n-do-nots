import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { createDayUserMeal, fetchApiFilteredMeals } from '../../actions/UserMealActions';
import { fetchAllMeals, fetchMeals } from '../../actions/MealActions'
import {receiveRoutineMeals} from "../../actions/NewRoutineActions";
import DateFormat from 'dateformat';
import {openModal} from "../../actions/ModalActions";


const mapStateToProps = (state, ownProps) => {
    const date = new Date()
    return {
        daySelect: state.ui.NewRoutineData,
        meals: state.entities.meals,
    }
};

const mapDispatchToProps = dispatch => ({
    createDayUserMeal: meal => dispatch(createDayUserMeal(meal)),
    fetchApiFilteredMeals: (minCals, maxCals) => dispatch(fetchApiFilteredMeals(minCals,maxCals)),
    fetchAllMeals: () => dispatch(fetchAllMeals()),
    fetchMeals: (options) => dispatch(fetchMeals(options)),
    saveRoutine: (routine) => dispatch(receiveRoutineMeals(routine)),
    openExercises: () => dispatch(openModal('bodyUI'))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);