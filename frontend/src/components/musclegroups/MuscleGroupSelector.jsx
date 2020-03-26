import React, { Component } from 'react';
import MaleFront from '../bodypartUI/MaleFront'
import MaleBack from '../bodypartUI/MaleBack'
import FemaleBack from '../bodypartUI/FemaleBack'
import FemaleFront from '../bodypartUI/FemaleFront'
import '../../scss/MuscleGroupSelector.scss'
class MuscleGroupSelector extends Component {

    constructor(props){
        super(props);
        this.handleSide = this.handleSide.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAllExercisesByMuscleGroups = this.handleAllExercisesByMuscleGroups.bind(this);
    }
    handleMouseEnter(field){
        if (!window.mobileAndTabletcheck()){
            this.setState({[field]: true})
        }
    }

    handleMouseLeave(field){
        if (!window.mobileAndTabletcheck()){
            this.setState({[field]: false})
        }
    }

    handleClick(field){
        Promise.resolve(this.props.selectMuscleGroup(field)).then(() => {
            this.props.fetchExercisesByMuscleGroups(this.props.selectedMuscleGroupIds)
        })

    }
    componentDidMount(){
        this.props.fetchMuscleGroups().then(() => {
            this.props.selectMuscleGroups(this.props.selectedMuscleGroupIds.map(groupId => this.props.muscleGroups[groupId]));
            this.props.fetchExercisesByMuscleGroups(this.props.selectedMuscleGroupIds)
        })
    }
    handleSide(){
        if (this.props.side === "front") {
            this.props.selectSide("back")
        } else {
            this.props.selectSide("front")
        }
    }
    handleAllExercisesByMuscleGroups(ids){
        this.props.fetchExercisesByMuscleGroups(ids)
    }



    render() {
        
        let {sex} = this.props;

        let bodySide;
        if (this.props.side === "front" && sex=== "M") {
            bodySide = <MaleFront handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.props}/>
        } else if(this.props.side === "back" && sex=== "M"){
            bodySide = <MaleBack handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.props}/>
        } else if(this.props.side === "front" && sex=== "F"){
            bodySide = <FemaleFront handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.props}/>
        } else if(this.props.side === "back" && sex=== "F"){
            bodySide = <FemaleBack handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.props}/>
        }
        return (
              <div className="muscle-group-selector-container">

                  <div className="muscle-group-selector">
                      <div className="exercise-selector-header">Select a muscle to train for selected date.</div>
                      <div>{bodySide}</div>
                      <div className="side-choice">
                          <div onClick={this.handleSide} >
                              {this.props.side === "front" ? "Back Muscles" : "Front Muscles"}
                          </div>
                      </div>
                  </div>

              </div>
        );
    }
}
export default MuscleGroupSelector;
