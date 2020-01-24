import React from 'react';
import { closeModal } from '../../actions/ModalActions';
import { connect } from 'react-redux';
import AddWorkoutsFormContainer from '../workouts/AddWorkoutsFormContainer';
import AddMealsFormContainer from '../meals/AddMealsFormContainer';
import SampleRoutinesContainer from '../sampleRoutines/SampleRoutinesContainer';
import '../../scss/Modal.scss'

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
        default:
            return null;
    }
    return (
        <div className="modal-background">
            <button onClick={closeModal}>X</button>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
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