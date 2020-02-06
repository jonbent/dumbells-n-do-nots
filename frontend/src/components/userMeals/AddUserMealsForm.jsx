import React from 'react';
import Pagination from '../pagination/Pagination'
import '../../scss/UserMealsModal.scss'
class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props)
        let dayStr = 0;
        this.state = {
            day: Object.keys(this.props.daySelect)[dayStr],
            toggleShowMeals: false,
            curPage: 1,
            pageSize: 10,
            itemsAmount: 100,
            numMeals: 0
        }
        this.updateField = this.updateField.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this)
        this.handleSetNumMeals = this.handleSetNumMeals.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }
    handlePageChange(page){
        this.setState({curPage: page}, () => {
            this.props.fetchMeals({pageSize: this.state.pageSize, pageNum: this.state.curPage})
        });
    }

    componentDidMount(){
        // this.props.fetchApiFilteredMeals(400, 500)
    }

    updateField(field, e) {
        this.setState({ [field]: e.currentTarget.value });
    }

    handleSetDate(e){
        this.setState({ day: Object.keys(this.props.daySelect)[e.currentTarget.value] })
    }

    handleSetNumMeals(e){
        e.preventDefault();
        this.props.fetchMeals({pageSize: this.state.pageSize, pageNum: this.state.curPage})
            .then(() => this.setState({toggleShowMeals: true}))

    }

    render(){
        let meals;
        if (this.state.toggleShowMeals){
            meals = this.props.meals.length > 0 ? (
                <div className="meal-list">
                    {this.props.meals.map(meal => (
                        <div className="meal-item">
                            {/*<img src={meal.photoUrl}/>*/}
                            <div className="meal-image" style={{backgroundImage: `url(${meal.photoUrl})`}}></div>
                            <div className="meal-info">
                                <div>{meal.title}</div>
                                <div className="meal-nutrients">
                                    <div>cals: {meal.calories}</div>
                                    <div>fat: {meal.fat}</div>
                                    <div>carbs: {meal.carbs}</div>
                                    <div>protein: {meal.protein}</div>

                                </div>
                            </div>
                        </div>)
                    )}
                    <div className="pagination-container">
                        <Pagination
                            changePage={this.handlePageChange}
                            curPage={this.state.curPage}
                            pageSize={this.state.pageSize}
                            itemsAmount={this.state.itemsAmount}
                        />

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
                    <select defaultValue={this.state.day} onChange={this.handleSetDate}>
                        {Object.keys(this.props.daySelect).map((date, idx) => <option key={date} value={idx}>{date}</option>)}
                    </select>
                </div>
                <div className="num-meals-select">
                    <div className="add-user-meals-numofmeals-label">Number of meals for {this.state.day}</div>
                    <form>
                            <div className="add-user-meals-numofmeals-input">
                                <input
                                    type="text"
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