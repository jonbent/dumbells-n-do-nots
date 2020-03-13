import {connect} from 'react-redux';
import React, {Component} from 'react';

import {updateFilter} from '../../actions/FilterActions';

import '../../scss/meals/MealsFilters.scss'
class MealsFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numMeals: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleAverage = this.handleAverage.bind(this)
    }
    handleChange(numMeals){
        if (numMeals[numMeals.length - 1] === ".") return null;
        if (isNaN(numMeals) && numMeals !== "") return null;
        if (numMeals > 6 || numMeals < 0) return null;
        this.setState({numMeals});
    }
    async handleAverage(){
        const num = parseInt(this.state.numMeals);
        if (isNaN(num) || num === 0) return null;
        await this.props.changeFilter('minCals', 2000 / num);
        await this.props.changeFilter('maxCals', 2500 / num);
    }
    render() {
        const {
            maxCals,
            minCals,
            changeFilter,
            confirmFilters
        } = this.props;
        return (
            <div className="meals-filters">
                <div className="filter-input-container">
                    <div>Calories Per Meal</div>
                    <div className="filter-input">
                        <label><h1>Min</h1>
                            <input onChange={e => changeFilter('minCals', e.target.value)}  type="text" value={minCals}/>
                        </label>
                        <div className="to-container"></div>
                        <label><h1>Max</h1>
                            <input onChange={e => changeFilter('maxCals', e.target.value)}  type="text" value={maxCals}/>
                        </label>
                    </div>
                </div>
                <div className="filter-summary-container">
                    <div className="title">Summary</div>
                    <div className="filter-summary">
                        <div className="nutrient-info">
                            <div>Carbs</div>
                            <div className="min-max-container">
                                <div className='min-max'>
                                    <div>{Math.floor((minCals / 4 ) * .4)}g</div>
                                </div>
                                <div className="to-container"></div>
                                <div className='min-max'>
                                    <div>{Math.floor((maxCals / 4 ) * .4)}g</div>
                                </div>
                            </div>
                        </div>
                        <div className="nutrient-info">
                            <div>Protein</div>
                            <div className="min-max-container">
                                <div className='min-max'>
                                    <div>{Math.floor((minCals / 4 ) * .4)}g</div>
                                </div>
                                <div className="to-container"></div>
                                <div className='min-max'>
                                    <div>{Math.floor((maxCals / 4 ) * .4)}g</div>
                                </div>
                            </div>
                        </div>
                        <div className="nutrient-info">
                            <div>Fats</div>
                            <div className="min-max-container">
                                <div className='min-max'>
                                    <div>{Math.floor((minCals / 9 ) * .2)}g</div>
                                </div>
                                <div className="to-container"></div>
                                <div className='min-max'>
                                    <div>{Math.floor((maxCals / 9 ) * .2)}g</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-input-container">
                    <div className="filter-input average">
                        <label>Average Calories by number of meals per day
                            <input type="text" placeholder="Maximum of 6" onChange={e => this.handleChange(e.target.value)} value={this.state.numMeals}/>
                        </label>
                        <div className="submit" onClick={() => this.handleAverage().then(confirmFilters)}>Submit</div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = ({ui}) => ({
    maxCals: ui.filters.maxCals,
    minCals: ui.filters.minCals,
});
const mapDispatchToProps = (dispatch) => ({
    changeFilter: (filterName, value) => dispatch(updateFilter({filterName, value}))
})
export default connect(mapStateToProps, mapDispatchToProps)(MealsFilters);