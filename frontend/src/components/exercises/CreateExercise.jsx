import React, {Component} from 'react';


import '../../scss/exercises/CreateExercise.scss'

class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muscleGroup: "",
            name: "",
            description: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchMuscleGroups();
    }

    handleChange(e, field){
        this.setState({
            [field]: e.target.value
        })
    }
    handleSubmit(){
        this.props.createExercise(this.state);
    }
    render() {
        const {exerciseErrors, muscleGroups} = this.props;
        const {name, description, muscleGroup} = this.state;
        return (
            <div className="create-exercise-form">
                <div className="add-user-exercise-input-container">
                    <label htmlFor="add-user-exercise-name">
                        <span>Name</span>
                        {!!exerciseErrors && !!exerciseErrors["name"] && <span className="exercise-errors">{exerciseErrors["name"]}</span>}
                    </label>
                    <input id="add-user-exercise-name" value={name} onChange={(e) => this.handleChange(e, "name")}/>
                </div>
                <div className="add-user-exercise-input-container">
                    <label htmlFor="add-user-exercise-muscle-group">
                        <span>Muscle Group</span>
                        {!!exerciseErrors && !!exerciseErrors["muscleGroup"] && <span className="exercise-errors">{exerciseErrors["muscleGroup"]}</span>}
                    </label>
                    <select value={muscleGroup} onChange={(e) => this.handleChange(e, "muscleGroup")}>
                        <option disabled value={""}>Select Muscle Group</option>
                        {Object.values(muscleGroups).map(mG => {
                            return <option key={mG._id} value={mG._id}>{mG.name}</option>
                        })}
                    </select>
                </div>
                <div className="add-user-exercise-input-container">
                    <label htmlFor="add-user-exercise-description">
                        <span>Description</span>
                        {!!exerciseErrors && !!exerciseErrors["description"] && <span className="exercise-errors">{exerciseErrors["description"]}</span>}
                    </label>
                    <textarea id="add-user-exercise-description" onChange={(e) => this.handleChange(e, "description")} value={description}>

                    </textarea>
                </div>
                <div className="submit-container">
                    <div className="submit" onClick={this.handleSubmit}>Create Exercise</div>
                </div>
            </div>
        );
    }
}

export default CreateExercise;