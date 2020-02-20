import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { createDayUserMeal, fetchApiFilteredMeals } from '../../actions/UserMealActions';
import { fetchAllMeals, fetchMeals } from '../../actions/MealActions'
import {receiveRoutineMeals} from "../../actions/NewRoutineActions";
import {openModal} from "../../actions/ModalActions";
import {receiveNumMeals, receiveDaySelected} from "../../actions/RoutineFilterActions"
import { receivePageNum, receivePageSize } from '../../actions/FilterActions';


const mapStateToProps = (state, ownProps) => {
    return {
        daySelect: state.ui.newRoutineData,
        meals: Object.values(state.entities.meals),
        day: state.ui.routineFilters.daySelected,
        numMeals: state.ui.routineFilters.numMeals,
        curUser: state.session.user,
        curPage: state.ui.filters.pageNum,
        pageSize: state.ui.filters.pageSize,
        totalMeals: parseInt(state.ui.filters.numMeals)
        // minCals: state.ui.routineFilters.minCals,
        // maxCals: state.ui.routineFilters.maxCals,
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
    receiveDaySelected: (day) => dispatch(receiveDaySelected(day)),
    changePage: num => dispatch(receivePageNum(num)),
    changePageSize: num => dispatch(receivePageSize(num)),
    // receiveGoalPath: (cals) => dispatch(receiveGoalPath(cals))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);