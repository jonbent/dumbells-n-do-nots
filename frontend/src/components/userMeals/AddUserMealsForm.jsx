import React from 'react';
import Pagination from '../pagination/Pagination'
import '../../scss/UserMealsModal.scss'

import MealItem from "../meals/MealItem";
import { debounce } from 'lodash'

class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleShowMeals: false,
            numMeals: props.numMeals || 0,
            selectedMeals: {},
            minCals: 500,
            maxCals: 625,
            mealSearch: "",
            ignoringFilters: false
        };
        this.updateField = this.updateField.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
        this.fetchMeals = this.fetchMeals.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSelectMeal = this.handleSelectMeal.bind(this);
        this.handleSubmitWeekMeals = this.handleSubmitWeekMeals.bind(this);
        this.handleSubmitDayMeals = this.handleSubmitDayMeals.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleFilterIngore = this.handleFilterIngore.bind(this);
        this.emitSearchInputChangeDebounce = debounce(this.emitSearchInputChange, 500);
    }

    async handlePageChange(page){
        const {fetchMeals, pageSize, minCals, maxCals, changePage} = this.props;
        await changePage(page);
        fetchMeals({ pageSize, pageNum: page, minCals, maxCals});
    }

    componentDidMount(){
        // this.props.fetchApiFilteredMeals(400, 500)
        let selectedMealIds = [];
        if (!!this.props.single){
            selectedMealIds = this.props.userMeals.map(uMeal => {

                return selectedMealIds.push(uMeal.meal)
            })
        } else {
            Object.values(this.props.daySelect).forEach((day) => selectedMealIds = selectedMealIds.concat(Object.keys(day.meals)));
        }
        this.props.fetchSelectedMeals(selectedMealIds);
        this.fetchMeals();
    }

    updateField(field, e) {
        this.setState({
            numMeals: e.target.value
        })
        // if(e.target.value.include(".")) return null;
        //
    }
    async emitSearchInputChange(val){
        const {changePage, fetchMeals, pageSize, minCals, maxCals} = this.props;
        if (val !== ""){
            await changePage(1);
            const fetchOptions = { pageSize, pageNum: 1, searchTerm: val};
            if (!this.state.ignoringFilters){
                fetchOptions.minCals = minCals;
                fetchOptions.maxCals = maxCals;
            }
            await fetchMeals(fetchOptions);
        } else {
            this.fetchMeals();
        }
    }
    handleSearchInputChange(e){
        const val = e.target.value;
        this.setState({
            mealSearch: val
        });
        this.emitSearchInputChangeDebounce(val);
    }
    handleFilterIngore(){
        this.setState({
            ignoringFilters: !this.state.ignoringFilters
        }, () => this.state.mealSearch ? this.emitSearchInputChange(this.state.mealSearch) : null)
    }
    handleSetDate(day, increment = null){
        const dayIndex = this.daySelectKeys.indexOf(this.props.day);
        if (increment !== null && !day){
            day = this.daySelectKeys[dayIndex + increment];
        }
        if (!day) return null;
        this.props.receiveDaySelected(day);
    }

    async fetchMeals() {
        const {pageSize, curPage, minCals, maxCals} = this.props;
        await this.props.fetchMeals({ pageSize, pageNum: curPage, minCals, maxCals});
        this.setState({toggleShowMeals: true})
    }
    handleSelectMeal(mealId, num = 0){
        if (!this.props.single){
            const routine = this.props.daySelect;
            let sumMeals = Object.values(routine[this.props.day].meals).reduce((acc, el) => acc + el, 0);
            if (num + sumMeals > this.props.numMeals) return null;
            if (!routine[this.props.day].meals[mealId]){
                if (num <= 0) return null;
                routine[this.props.day].meals[mealId] = num;
            } else {
                if (num + routine[this.props.day].meals[mealId] < 0) return null;
                routine[this.props.day].meals[mealId] += num;
            }
            this.props.saveRoutine(routine)
        } else {
            this.props.updateDaysMeal(this.props.dbDay._id, mealId, num)
        }

    }

    handleSubmitDayMeals(){
        this.props.closeSelector()
    }
    handleSubmitWeekMeals(){
        this.props.openExercises()
    }

    render(){
        let mealList;
        const {daySelect, totalMeals, day, allMeals, openMealsFilters, curPage, pageSize, singleDay, single = false, dbDay, userMeals} = this.props;
        const {mealSearch, toggleShowMeals, ignoringFilters} = this.state;
        let selectedDay;
        let daySelectedMeals = new Set();
        let calorieCounts;
        let calorieCountClass;
        if (!single){
            this.daySelectKeys = Object.keys(daySelect);
            calorieCounts = this.daySelectKeys.map((dateString, idx) => {
            const mealKeys =  Object.keys(daySelect[dateString].meals);
            if (dateString === day) selectedDay = idx;
            return mealKeys
                .reduce((acc, mealId) => {
                    if (selectedDay === idx && !isNaN(daySelect[dateString].meals[mealId]) && daySelect[dateString].meals[mealId] > 0) daySelectedMeals.add(mealId);
                    return allMeals[mealId] ?
                        acc + (allMeals[mealId].calories * daySelect[dateString].meals[mealId]) :
                        acc + 0;
                }, 0)
            });
            daySelectedMeals = Array.from(daySelectedMeals);

            calorieCountClass = calorieCounts[selectedDay] < 1800 ?
                "too-low" :
                calorieCounts[selectedDay] > 2800 ? 'too-high' : "just-right";
        } else {
            calorieCounts = userMeals.reduce((acc, el) => acc + (allMeals[el.meal].calories * el.quantity), 0);
            calorieCountClass = calorieCounts < 1800 ?
                "too-low" :
                calorieCounts > 2800 ? 'too-high' : "just-right";
            daySelectedMeals = userMeals.filter(m => m.quantity > 0).map(m => m.meal);
        }

        if (toggleShowMeals){
            const mealsArray = Object.values(this.props.meals);
            mealList = mealsArray.length > 0 ? (
                <div className="meal-list">
                    {mealsArray.map(meal => {
                            return <MealItem
                                meal={meal}
                                key={meal._id}
                                daySelect={daySelect}
                                handleSelectMeal={this.handleSelectMeal}
                                day={day}
                                single={!!single}
                                dbDay={dbDay}
                                userMeals={userMeals}
                            />
                        }
                    )}
                    <div className="pagination-container">
                        <Pagination
                            changePage={this.handlePageChange}
                            curPage={curPage}
                            pageSize={pageSize}
                            itemsAmount={totalMeals}
                        />
                    </div>
                    <div className='routine-actions'>
                        <div className="select-filters">
                            <div onClick={openMealsFilters}>Select Filters</div>
                        </div>
                        <div className="submit-meals" onClick={!!singleDay ? this.handleSubmitDayMeals : this.handleSubmitWeekMeals}>
                            {singleDay ? "Confirm Day's Meals" : "Confirm Week's Meals"}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="not-found">
                    <div>Cannot find meals with given filters</div>
                    <div onClick={openMealsFilters}>Select Filters</div>
                </div>
            )

        }
        return(
            <div className="meal-selector">
                <div className="day-select">
                    {!singleDay && <h1>Select Day</h1>}
                    <div>
                        {!singleDay && <div onClick={() => this.handleSetDate(null,-1)}>Prev.</div>}
                        <select value={day} onChange={(e) => this.handleSetDate(e.currentTarget.value)}>
                            {!singleDay && Object.keys(daySelect).map((date) => <option key={date} value={date}>{date}</option>)}
                            {!!singleDay && <option value={day}>{day}</option>}
                        </select>
                        {!singleDay && <div onClick={() => this.handleSetDate( null, 1)}>Next</div>}
                    </div>
                </div>
                <div className={`calorie-count ${calorieCountClass}`}>Total Calories: {!single ? calorieCounts[selectedDay] : calorieCounts}</div>
                <div className="meal-search">
                    <div className="search-headers">
                        <div>Search for meals</div>
                        <div className={`ignore-filters ${ignoringFilters ? "ignoring" : ""}`} onClick={this.handleFilterIngore}>{ignoringFilters ? "Enable Filters for Search" : "Disable Filters for Search"}</div>
                    </div>
                    <input placeholder="Search by title..." value={mealSearch} onChange={this.handleSearchInputChange}/>
                </div>
                <div className={"selected-meals"}>
                    <div>Meals Selected</div>
                    {daySelectedMeals.map(mealId => {
                        if (!allMeals[mealId]) return null;
                        return (
                            <MealItem
                                key={mealId}
                                meal={allMeals[mealId]}
                                selected={false}
                                daySelect={daySelect}
                                userMeals={userMeals}
                                dbDay={dbDay}
                                day={day}
                                handleSelectMeal={this.handleSelectMeal}
                                single={single}
                            />
                        )
                    })}
                </div>
                {mealList}
            </div>
        )
    }
}

export default AddUserMealsForm