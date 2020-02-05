import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { createDayUserMeal, fetchApiFilteredMeals } from '../../actions/UserMealActions';
import { fetchAllMeals } from '../../actions/MealActions'
import DateFormat from 'dateformat';


const mapStateToProps = (state, ownProps) => {
    const date = new Date()
    return {
        daySelect: state.ui.NewRoutineData,
        meals: state.entities.meals
    }
};

const mapDispatchToProps = dispatch => ({
    createDayUserMeal: meal => dispatch(createDayUserMeal(meal)),
    fetchApiFilteredMeals: (minCals, maxCals) => dispatch(fetchApiFilteredMeals(minCals,maxCals)),
    fetchAllMeals: () => dispatch(fetchAllMeals())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);