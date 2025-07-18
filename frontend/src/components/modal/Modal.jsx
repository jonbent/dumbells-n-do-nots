import React from 'react';
import { closeModal } from '../../actions/ModalActions';
import { connect } from 'react-redux';
import AddWorkoutsFormContainer from '../workouts/AddWorkoutsFormContainer';
import AddMealsFormContainer from '../meals/AddMealsFormContainer';
import SampleRoutinesContainer from '../sampleRoutines/SampleRoutinesContainer';
import ExistingRoutine from '../routine/ExistingRoutine';
import '../../scss/Modal.scss';

import AddRoutineFormContainer from '../routine/NewRoutineFormContainer';
import ExerciseSelector from '../exercises/ExerciseSelectorContainer';
import AddUserMealsForm from '../userMeals/AddUserMealsForm';
import MealDetails from '../meals/MealDetails';
function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'addWorkouts':
            component = <AddWorkoutsFormContainer />;
            break;
        case 'addMeals':
            component = <AddMealsFormContainer />;
            break;
        case 'sample':
            component = <SampleRoutinesContainer />;
            break;
        case 'addRoutine':
            component = <AddRoutineFormContainer />;
            break;
        case 'bodyUI':
            component = <ExerciseSelector />;
            break;
        case 'existingRoutine':
            component = <ExistingRoutine closeModal={closeModal}/>;
            break;
        case 'addUserMeals':
            component = <AddUserMealsForm />;
            break;
        case "mealDetails":
            component = <MealDetails closeModal={closeModal}/>;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background">

            <div className="modal-child-container">
                <div className="close-modal-button" onClick={closeModal}>
                    <div>
                        Close
                    </div>
                </div>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
