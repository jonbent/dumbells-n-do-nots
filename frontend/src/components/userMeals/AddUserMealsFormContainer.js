import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { createDayUserMeal, fetchApiFilteredMeals } from '../../actions/UserMealActions';
import { fetchAllMeals, fetchMeals } from '../../actions/MealActions'
import {receiveRoutineMeals} from "../../actions/NewRoutineActions";
import {openModal} from "../../actions/ModalActions";
import {receiveNumMeals, receiveDaySelected} from "../../actions/RoutineFilterActions"


const mapStateToProps = (state, ownProps) => {
    return {
        daySelect: state.ui.newRoutineData,
        meals: Object.values(state.entities.meals),
        day: state.ui.routineFilters.daySelected,
        numMeals: state.ui.routineFilters.numMeals
    }
};

const mapDispatchToProps = dispatch => ({
    createDayUserMeal: meal => dispatch(createDayUserMeal(meal)),
    fetchApiFilteredMeals: (minCals, maxCals) => dispatch(fetchApiFilteredMeals(minCals,maxCals)),
    fetchAllMeals: () => dispatch(fetchAllMeals()),
    fetchMeals: (options) => dispatch(fetchMeals(options)),
    saveRoutine: (routine) => dispatch(receiveRoutineMeals(routine)),
    openExercises: () => dispatch(openModal('bodyUI')),
    receiveNumMeals: (num) => dispatch(receiveNumMeals(num)),
    receiveDaySelected: (day) => dispatch(receiveDaySelected(day))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);