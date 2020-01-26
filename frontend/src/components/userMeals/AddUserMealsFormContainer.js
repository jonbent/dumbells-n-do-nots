import { connect } from 'react-redux';
import AddUserMealsForm from './AddUserMealsForm';
import { createDayUserMeal } from '../../actions/UserMealActions'
import DateFormat from 'dateformat';


const mapStateToProps = (state, ownProps) => {
    // const date = new Date()
    // startDate = 
    return {
        routine: 
    }
};

const mapDispatchToProps = dispatch => ({
    createDayUserMeal: meal => dispatch(createDayUserMeal(meal))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUserMealsForm);