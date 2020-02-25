import React, {Component} from 'react';
import '../../scss/days/EditDay.scss'
import AddUserMealsForm from "../userMeals/AddUserMealsFormContainer";

class EditMeals extends Component {
    render() {
        const {closeSelector} = this.props;
        return (
            <div className="edit-day-container">
                <AddUserMealsForm singleDay={true} closeSelector={closeSelector}/>
            </div>
        );
    }
}

export default EditMeals;