import React from 'react';
import { closeModal } from '../../actions/ModalActions';
import { connect } from 'react-redux';
import MealsFilters from '../modal/MealsFilters'
import '../../scss/Modal.scss'

import AddRoutineFormContainer from '../routine/NewRoutineFormContainer'
import ExerciseSelector from '../exercises/ExerciseSelectorContainer';
import AddUserMealsFormContainer from '../userMeals/AddUserMealsFormContainer'

const FiltersModal = ({ modal, closeModal }) => {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'meals':
            return <MealsFilters />
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
        modal: state.ui.filterModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);