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
            hoverBack: false,
            selectedMuscleGroups: []
        }
        this.handleSide = this.handleSide.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.selectedBodyGroups = this.selectedBodyGroups.bind(this);
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
        this.setState({[field]: !this.state[field]} )
        // this.setState({selectedMuscleGroups: this.state.selectedMuscleGroups.concat([])});
    }
    componentDidMount(){
        this.props.fetchMuscleGroups();
        
        // this.props.fetchAllExercisesByMuscleGroup();
    }
    handleSide(){
        if (this.state.side === "front") {
            this.setState({side: "back"})
        } else {
            this.setState({side: "front"})
        }
    }
    handleAllExercisesByMuscleGroups(ids){
        this.props.fetchAllExercisesByMuscleGroup1(ids)
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
        
        let {sex, muscleGroups, exercises} = this.props;
        let chest, abs, legs, calves, shoulders, back, arms;
        let chestEx = [], absEx= [], legsEx= [], calvesEx= [], shouldersEx= [], backEx= [], armsEx = [];
        if (muscleGroups && exercises){
            Object.values(muscleGroups).forEach(muscleGroup => {
                if(muscleGroup.name === "Chest"){
                    chest =  muscleGroup._id;  
                }
                if(muscleGroup.name === "Abs"){
                    abs =  muscleGroup._id;
                    if (this.state.Abs && !this.state.selectedMuscleGroups.includes(abs)) {
                        this.state.selectedMuscleGroups.push(abs)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)
                    } else if (!this.state.Abs) {
                        for(let i = 0; i < this.state.selectedMuscleGroups.length; i++){
                            if (this.state.selectedMuscleGroups[i] === abs) {
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
                if(muscleGroup.name === "Legs"){
                    legs =  muscleGroup._id;
                    if(this.state.Legs &&!this.state.selectedMuscleGroups.includes(legs)){
                        this.state.selectedMuscleGroups.push(legs)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)

                    } else if (!this.state.Legs){
                        for(let i=0; i < this.state.selectedMuscleGroups.length; i++){
                            if(this.state.selectedMuscleGroups[i] === legs){
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
                if(muscleGroup.name === "Calves"){
                    calves =  muscleGroup._id;
                    if(this.state.Calves &&!this.state.selectedMuscleGroups.includes(calves)){
                        this.state.selectedMuscleGroups.push(calves)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)

                    } else if (!this.state.Calves){
                        for(let i=0; i < this.state.selectedMuscleGroups.length; i++){
                            if(this.state.selectedMuscleGroups[i] === calves){
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
                if(muscleGroup.name === "Shoulders"){
                    shoulders =  muscleGroup._id;
                    if(this.state.Shoulders &&!this.state.selectedMuscleGroups.includes(shoulders)){
                        this.state.selectedMuscleGroups.push(shoulders)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)

                    } else if (!this.state.Shoulders){
                        for(let i=0; i < this.state.selectedMuscleGroups.length; i++){
                            if(this.state.selectedMuscleGroups[i] === shoulders){
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
                if(muscleGroup.name === "Back"){
                    back =  muscleGroup._id;
                    if(this.state.Back &&!this.state.selectedMuscleGroups.includes(back)){
                        this.state.selectedMuscleGroups.push(back)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)

                    } else if (!this.state.Back){
                        for(let i=0; i < this.state.selectedMuscleGroups.length; i++){
                            if(this.state.selectedMuscleGroups[i] === back){
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
                if(muscleGroup.name === "Arms"){
                    arms =  muscleGroup._id;
                    if(this.state.Arms &&!this.state.selectedMuscleGroups.includes(arms)){
                        this.state.selectedMuscleGroups.push(arms)
                        this.handleAllExercisesByMuscleGroups(this.state.selectedMuscleGroups)

                    } else if (!this.state.Arms){
                        for(let i=0; i < this.state.selectedMuscleGroups.length; i++){
                            if(this.state.selectedMuscleGroups[i] === arms){
                                this.state.selectedMuscleGroups.splice(i, 1);
                            }
                        }
                    }
                }
            });

            
            Object.values(exercises).forEach((exercise, idx) => {
                                
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
              {this.state.Back ? backEx : ""}
              {this.state.Chest ? chestEx : ""}
              {this.state.Arms ? armsEx : ""}
              {this.state.Legs ? legsEx : ""}
              {this.state.Abs ? absEx : ""}
              {this.state.Calves ? calvesEx : ""}
              {this.state.Shoulders ? shouldersEx : ""}

            </div>
          </div>
        );
    }
}
export default MuscleGroupSelector;
