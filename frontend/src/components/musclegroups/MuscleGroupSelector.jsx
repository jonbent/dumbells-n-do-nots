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
        this.props.fetchMuscleGroups();
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
        const {sex} = this.props;
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
        // debugger
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
            </div>
          </div>
        );
    }
}
export default MuscleGroupSelector;
