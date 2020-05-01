import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { fetchMeals, fetchSelectedMeals } from '../../actions/MealActions'
import {receiveRoutineMeals} from "../../actions/NewRoutineActions";
import {openModal} from "../../actions/ModalActions";
import {receiveNumMeals, receiveDaySelected} from "../../actions/RoutineFilterActions"
import { receivePageNum, receivePageSize } from '../../actions/FilterActions';
import {openFiltersModal} from "../../actions/FiltersModalActions";
import {updateDaysMeal} from "../../actions/RoutineActions";


const mapStateToProps = (state, ownProps) => {
    let day = !ownProps.single ? state.ui.routineFilters.daySelected : ownProps.day
    return {
        daySelect: state.ui.newRoutineData,
        meals: state.entities.meals,
        allMeals: state.entities.routineMeals,
        day,
        numMeals: state.ui.routineFilters.numMeals,
        curUser: state.session.user,
        curPage: state.ui.filters.pageNum,
        pageSize: state.ui.filters.pageSize,
        totalMeals: parseInt(state.ui.filters.numMeals),
        minCals: state.ui.filters.minCals,
        maxCals: state.ui.filters.maxCals,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchMeals: (options) => dispatch(fetchMeals(options)),
    saveRoutine: (routine) => dispatch(receiveRoutineMeals(routine)),
    openExercises: () => dispatch(openModal('bodyUI')),
    receiveNumMeals: (num) => dispatch(receiveNumMeals(num)),
    receiveDaySelected: (day) => dispatch(receiveDaySelected(day)),
    changePage: num => dispatch(receivePageNum(num)),
    openMealsFilters: () => dispatch(openFiltersModal('meals')),
    changePageSize: num => dispatch(receivePageSize(num)),
    fetchSelectedMeals: (selectedMealIds) => dispatch(fetchSelectedMeals(selectedMealIds)),
    updateDaysMeal: (dayId, mealId, val) => dispatch(updateDaysMeal(dayId, mealId, val))
    // receiveGoalPath: (cals) => dispatch(receiveGoalPath(cals))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);