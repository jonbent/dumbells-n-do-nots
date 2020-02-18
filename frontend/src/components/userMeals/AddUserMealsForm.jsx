import React from 'react';
import Pagination from '../pagination/Pagination'
import '../../scss/UserMealsModal.scss'

import MealItem from "../meals/MealItem";
class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props);
        let dayStr = 0;
        let minCals;
        let maxCals;
        this.state = {
            day: Object.keys(this.props.daySelect)[dayStr],
            toggleShowMeals: false,
            curPage: 1,
            pageSize: 10,
            itemsAmount: 100,
            numMeals: this.props.numMeals || 0,
            selectedMeals: {}
        }
        this.updateField = this.updateField.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
        this.handleSetNumMeals = this.handleSetNumMeals.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSelectMeal = this.handleSelectMeal.bind(this);
        this.handleSubmitWeekMeals = this.handleSubmitWeekMeals.bind(this);
    }

    handlePageChange(page){
        this.setState({curPage: page}, () => {
            this.props.fetchMeals({ pageSize: this.state.pageSize, pageNum: this.state.curPage, minCals: "500", maxCals: "700"})
        });
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

    handleSetNumMeals(e) {
        e.preventDefault();
        this.props.fetchMeals({pageSize: this.state.pageSize, pageNum: this.state.curPage})
            .then(() => {this.setState({toggleShowMeals: true}); this.props.receiveNumMeals(this.state.numMeals)})
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
        const {daySelect} = this.props;
        let sumAllMeals = 0;
        Object.values(this.props.daySelect).forEach((day) => Object.values(day.meals).forEach(mealVal => sumAllMeals += mealVal));
        if (this.state.toggleShowMeals){
            meals = this.props.meals.length > 0 ? (
                <div className="meal-list">
                    {this.props.meals.map(meal => (
                        <MealItem meal={meal} key={meal._id} daySelect={daySelect} handleSelectMeal={this.handleSelectMeal} day={this.props.day}/>
                        )
                    )}
                    <div className="pagination-container">
                        <Pagination
                            changePage={this.handlePageChange}
                            curPage={this.state.curPage}
                            pageSize={this.state.pageSize}
                            itemsAmount={this.state.itemsAmount}
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