import React from 'react';
import { closeFiltersModal } from '../../actions/FiltersModalActions';
import { connect } from 'react-redux';
import MealsFilters from '../modal/MealsFilters'
import '../../scss/Modal.scss'
import { fetchMeals } from '../../actions/MealActions'
import {receivePageNum} from "../../actions/FilterActions";

const FiltersModal = ({ modal, closeFiltersModal, fetchMeals, pageSize, minCals, maxCals, pageNum, changePage }) => {
    if (!modal) {
        return null;
    }
    let component;
    const confirmFilters = () => {
        changePage(1);
        closeFiltersModal();
        fetchMeals({ pageSize, pageNum: 1, minCals, maxCals});
    };
    switch (modal) {
        case "meals":
            component = <MealsFilters confirmFilters={confirmFilters}/>;
            break;
        default:
            return null;
    }
    return (
        <div className="filters-modal-background">
            <div className="modal-child-container">
                <div className="close-modal-button" onClick={confirmFilters}>
                    <div>
                        Confirm Filters
                    </div>
                </div>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    {component}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ui}) => {
    return {
        modal: ui.filtersModal,
        maxCals: ui.filters.maxCals,
        minCals: ui.filters.minCals,
        pageNum: ui.filters.pageNum,
        pageSize: ui.filters.pageSize
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeFiltersModal: () => dispatch(closeFiltersModal()),
        fetchMeals: (filters) => dispatch(fetchMeals(filters)),
        changePage: num => dispatch(receivePageNum(num)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);