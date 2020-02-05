import React, { Component } from 'react';
import MaleFront from '../bodypartUI/MaleFront'
import MaleBack from '../bodypartUI/MaleBack'
import FemaleBack from '../bodypartUI/FemaleBack'
import FemaleFront from '../bodypartUI/FemaleFront'
import '../../scss/MuscleGroupsSelector.scss'
class MuscleGroupSelector extends Component {

    constructor(props){
        super(props);
        this.state = {
            side: "front",
            Arms: false,
            Legs: false,
            Shoulders: false,
            Calves: false,
            Abs: false,
            Chest: false,
            Back: false,
            hoverArms: false,
            hoverLegs: false,
            hoverShoulders: false,
            hoverCalves: false,
            hoverAbs: false,
            hoverChest: false,
            hoverBack: false
        }
        this.handleSide = this.handleSide.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.selectedBodyGroups = this.selectedBodyGroups.bind(this);
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
        this.setState({[field]: !this.state[field]})
    }
    componentDidMount(){
        this.props.fetchMuscleGroups().then(
            console.log("dfdf",this.props.muscleGroups)

        );
        
        this.props.fetchAllExercisesByMuscleGroup();
    }
    handleSide(){
        if (this.state.side === "front") {
            this.setState({side: "back"})
        } else {
            this.setState({side: "front"})
        }
    }

    selectedBodyGroups(){
        let arr = []
        for(let i=1; i< 8; i++){
            if(Object.values(this.state)[i] === true){
                arr.push(Object.keys(this.state)[i])
            }
        }
        return arr
    }

    render() {
        
        const {sex, muscleGroups, exercises} = this.props;
        let chest, abs, legs, calves, shoulders, back, arms;
        let chestEx = [], absEx= [], legsEx= [], calvesEx= [], shouldersEx= [], backEx= [], armsEx = [];
        if (muscleGroups && exercises){
            Object.values(muscleGroups).forEach(muscleGroup => {
                if(muscleGroup.name === "Chest"){
                    chest =  muscleGroup._id;  
                    console.log(chest);
                                      
                }
                if(muscleGroup.name === "Abs"){
                    abs =  muscleGroup._id;
                }
                if(muscleGroup.name === "Legs"){
                    legs =  muscleGroup._id;
                }
                if(muscleGroup.name === "Calves"){
                    calves =  muscleGroup._id;
                }
                if(muscleGroup.name === "Shoulders"){
                    shoulders =  muscleGroup._id;
                }
                if(muscleGroup.name === "Back"){
                    back =  muscleGroup._id;
                }
                if(muscleGroup.name === "Arms"){
                    arms =  muscleGroup._id;
                }
            });
            // console.log("ex",Object.values(exercises));
            // console.log("chest",typeof chest);
            
            Object.values(exercises).forEach((exercise, idx) => {
                
                console.log(exercise.muscleGroup);
                
                if (exercise.muscleGroup === chest) {
                    chestEx.push(exercise.name)
                }
                if (exercise.muscleGroup === abs) {
                    absEx.push(exercise.name);
                }
                if (exercise.muscleGroup === legs){
                    legsEx.push(exercise.name)
                }
                if (exercise.muscleGroup === shoulders) {
                    shouldersEx.push(exercise.name)
                }
                if (exercise.muscleGroup === calves) {
                    calvesEx.push(exercise.name)
                }
                if (exercise.muscleGroup === arms) {
                    armsEx.push(exercise.name)
                }
                if (exercise.muscleGroup === back) {
                    backEx.push(exercise.name)
                }
            });
        }


        let bodySide;
        if (this.state.side === "front" && sex=== "M") {
            bodySide = <MaleFront handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.state}/>
        } else if(this.state.side === "back" && sex=== "M"){
            bodySide = <MaleBack handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.state}/>
        } else if(this.state.side === "front" && sex=== "F"){
            bodySide = <FemaleFront handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.state}/>
        } else if(this.state.side === "back" && sex=== "F"){
            bodySide = <FemaleBack handleClick={this.handleClick} handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} {...this.state}/>
        }
        console.log(chestEx)
        return (
          <div>
            <div className="selected-muscle-groups">Selected Muscles: {this.selectedBodyGroups().map(muscle => muscle + " ")} </div>
            <div className="muscle-group-selector-container">
              <div>{bodySide}</div>
              <div>
                <div onClick={this.handleSide}>
                  {this.state.side === "front" ? "Back" : "Front"}
                </div>
              </div>
              {this.state.Back ? backEx: ""}
              {this.state.Chest ? chestEx: ""}
              {this.state.Arms ? armsEx: ""}
              {this.state.Legs ? legsEx: ""}
              {this.state.Abs ? absEx: ""}
              {this.state.Calves ? calvesEx: ""}
              {this.state.Shoulders ? shouldersEx: ""}

            </div>
          </div>
        );
    }
}
export default MuscleGroupSelector;
