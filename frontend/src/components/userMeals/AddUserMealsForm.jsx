import React from 'react';

class AddUserMealsForm extends React.Component{
    constructor(props){
        super(props)
        let dayStr = 0;
        this.state = {
            day: Object.keys(this.props.daySelect)[dayStr],
        }
        this.handleSetDate = this.handleSetDate.bind(this)
    }

    handleSetDate(e){
        this.setState({ day: Object.keys(this.props.daySelect)[e.currentTarget.value] })
    }

    render(){
        return(
            <div>
                <h1>Select meals</h1>
                <select defaultValue={this.state.day} onChange={this.handleSetDate}>
                    {Object.keys(this.props.daySelect).map((date, idx) => <option key={date} value={idx}>{date}</option>)}
                </select>
            </div>
        )
    }
}

export default AddUserMealsForm