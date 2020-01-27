import React from 'react';

class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props)
        let dayStr = 0;
        this.state = {
            day: Object.keys(this.props.daySelect)[dayStr],
            numMeals: 0,
            toggleShowMeals: false
        }
        this.updateField = this.updateField.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this)
        this.handleSetNumMeals = this.handleSetNumMeals.bind(this)
    }

    updateField(field, e) {
        this.setState({ [field]: e.currentTarget.value });
    }

    handleSetDate(e){
        this.setState({ day: Object.keys(this.props.daySelect)[e.currentTarget.value] })
    }

    handleSetNumMeals(e){
        this.setState({toggleShowMeals: true})
    }

    render(){
        let meals;
        if (this.state.toggleShowMeals){
            let numMeals = parseInt(this.state.numMeals)
            if(numMeals){
            let numMealsArray = [...Array(numMeals).keys()]
            meals = (
                <ul>
                    {numMealsArray.map(mealIdx => <li>Meal {mealIdx + 1}</li>)}
                </ul>
            );
            } else {
                this.setState({toggleShowMeals: false})
            }
        }
        return(
            <div>
                <h1>Select meals</h1>
                <select defaultValue={this.state.day} onChange={this.handleSetDate}>
                    {Object.keys(this.props.daySelect).map((date, idx) => <option key={date} value={idx}>{date}</option>)}
                </select>
                <form >
                <div className="add-user-meals-form-input">
                <label className="add-user-meals-numofmeals-label">Select number of meals for {this.state.day}</label>
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
                </div>
                {meals}
                </form>
            </div>
        )
    }
}

export default AddUserMealsForm