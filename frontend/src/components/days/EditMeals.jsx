import React, {Component} from 'react';
import '../../scss/days/EditDay.scss'
import AddUserMealsForm from "../userMeals/AddUserMealsFormContainer";

class EditMeals extends Component {
    render() {
        const {closeSelector, single = false, dbDay, day, userMeals} = this.props;
        return (
            <div className="edit-day-container">
                <AddUserMealsForm
                    singleDay={true}
                    closeSelector={closeSelector}
                    single={single}
                    dbDay={dbDay}
                    day={day}
                    userMeals={userMeals}
                />
            </div>
        );
    }
}

export default EditMeals;