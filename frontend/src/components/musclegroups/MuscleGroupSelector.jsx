import React, { Component } from 'react';
import MaleFront from '../bodypartUI/MaleFront'
import MaleBack from '../bodypartUI/MaleBack'
import FemaleBack from '../bodypartUI/FemaleBack'
import FemaleFront from '../bodypartUI/FemaleFront'
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
    }

    handleSide(){
        if (this.state.side === "front") {
            this.setState({side: "back"})
        } else {
            this.setState({side: "front"})
        }
    }

    render() {
        const {sex} = this.props;
        let bodySide;
        if (this.state.side === "front" && sex=== "M") {
            bodySide = <MaleFront/>
        } else if(this.state.side === "back" && sex=== "M"){
            bodySide = <MaleBack/>
        } else if(this.state.side === "front" && sex=== "F"){
            bodySide = <FemaleFront/>
        } else if(this.state.side === "back" && sex=== "F"){
            bodySide = <FemaleBack/>
        }
        return (
          <div>
            <div className="okay">
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
