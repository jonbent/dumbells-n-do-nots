import React from 'react';
import Pagination from '../pagination/Pagination'
import '../../scss/UserMealsModal.scss'

import MealItem from "../meals/MealItem";
class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggleShowMeals: false,
            numMeals: props.numMeals || 0,
            selectedMeals: {},
            minCals: "",
            maxCals: ""
        }
        this.updateField = this.updateField.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
        this.handleSetNumMeals = this.handleSetNumMeals.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSelectMeal = this.handleSelectMeal.bind(this);
        this.handleSubmitWeekMeals = this.handleSubmitWeekMeals.bind(this);
    }

    async handlePageChange(page){
        await this.props.changePage(page);
        this.props.fetchMeals({ pageSize: this.props.pageSize, pageNum: this.props.curPage, minCals: 2000/this.props.numMeals, maxCals: 2500/this.props.numMeals})
    }

    componentDidMount(){
        // this.props.fetchApiFilteredMeals(400, 500)
    }

    updateField(field, e) {
        this.setState({
            numMeals: e.target.value
        })
        // if(e.target.value.include(".")) return null;
        //
    }

    handleSetDate(e){
        this.setState({ day: Object.keys(this.props.daySelect)[e.currentTarget.value] })
        this.props.receiveDaySelected(Object.keys(this.props.daySelect)[e.currentTarget.value])
    }

    async handleSetNumMeals(e) {
        e.preventDefault();
        await this.props.receiveNumMeals(this.state.numMeals);
        this.props.fetchMeals({ pageSize: this.props.pageSize, pageNum: this.props.curPage, minCals: 2000/this.props.numMeals, maxCals: 2500/this.props.numMeals})
            .then(() => {this.setState({toggleShowMeals: true});})
    }
    handleSelectMeal(mealId, num = 0){
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
    }

    handleSubmitWeekMeals(allMeals){
        if (allMeals === this.props.numMeals * 7 ){
            this.props.openExercises()
        }
    }

    render(){
        let meals;
        const {daySelect, totalMeals, day, allMeals} = this.props;
        const calSum = daySelect[day].meals && Object.keys(allMeals).length ? Object.keys(daySelect[day].meals).filter(key => daySelect[day].meals[key] > 0).reduce((acc, mId) => allMeals[mId] ? acc + parseInt(allMeals[mId].calories) : acc + 0, 0) : 0;
        let sumAllMeals = 0;
        const daySelectVals = Object.values(daySelect);
        daySelectVals.forEach((day) => Object.values(day.meals).forEach(mealVal => sumAllMeals += mealVal));
        if (this.state.toggleShowMeals){
            const mealsArray = Object.values(this.props.meals);
            meals = mealsArray.length > 0 ? (
                <div className="meal-list">
                    {mealsArray.map(meal => {
                            return <MealItem meal={meal} key={meal._id} daySelect={daySelect}
                                      handleSelectMeal={this.handleSelectMeal} day={day}/>
                        }
                    )}
                    <div className="pagination-container">
                        <Pagination
                            changePage={this.handlePageChange}
                            curPage={this.props.curPage}
                            pageSize={this.props.pageSize}
                            itemsAmount={totalMeals}
                        />
                    </div>
                    {
                        sumAllMeals !== this.props.numMeals * 7 && (
                            <div className="info">Please Select {this.props.numMeals} meal(s) for each day</div>
                        )
                    }
                    <div className={`submit-meals ${sumAllMeals === this.props.numMeals * 7 ? "" : "disabled"}`} onClick={() => this.handleSubmitWeekMeals(sumAllMeals)}>
                        Confirm Week's Meals
                    </div>
                </div>
            ) : (
                <div>
                    Cannot find meals
                </div>
            )

        }
        return(
            <div className="meal-selector">
                <div className="day-select">
                    <h1>Select Day</h1>
                    <select defaultValue={this.props.day} onChange={this.handleSetDate}>
                        {Object.keys(this.props.daySelect).map((date, idx) => <option key={date} value={idx}>{date}</option>)}
                    </select>
                </div>
                <div className="num-meals-select">
                    <div className="add-user-meals-numofmeals-label">Select number of meals for {this.props.day}</div>
                    <div>Total Calories: {calSum}</div>
                    <form>
                            <div className="add-user-meals-numofmeals-input">
                                <input
                                    type="number"
                                    onChange={e => this.updateField("numMeals", e)}
                                    value={this.state.numMeals}
                                />
                            </div>
                        <input
                            type="submit"
                            onClick={this.handleSetNumMeals}
                            value="Submit"
                            />
                    </form>
                </div>
                {meals}
            </div>
        )
    }
}

export default AddUserMealsForm