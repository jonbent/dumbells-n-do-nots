import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/bodyUI/maleFront.scss';
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';



class MaleFront extends Component{

    

    constructor(props){
        super(props);
        this.handleArmsClick = this.handleArmsClick.bind(this);
        this.handleAbsClick = this.handleAbsClick.bind(this);
        this.handleChestClick = this.handleChestClick.bind(this);
        this.handleLegsClick = this.handleLegsClick.bind(this);
        this.handleShouldersClick = this.handleShouldersClick.bind(this);
        this.state = {
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
        };

    }

    componentDidMount(){
        this.props.fetchMuscleGroups();
    }
    
    handleMouseEnter(field){
        this.setState({[field]: true})
    }

    handleMouseLeave(field){
        this.setState({[field]: false})
    }

    handleAbsClick(){
        this.setState({Abs: !this.state.Abs})
    }

     handleChestClick(){
        this.setState({Chest: !this.state.Chest})
    }
     handleLegsClick(){
        this.setState({Legs: !this.state.Legs})
    }
     handleShouldersClick(){
        this.setState({Shoulders: !this.state.Shoulders})
    }

    handleArmsClick(){
        this.setState({Arms: !this.state.Arms})
    }

    render(){
        return(
            <div className= "male-front-container">
            <div className="male-front-selector">
                
                <img id="front-male-muscle-group" src="/images/maleUI/front/front-male-muscle-group.png" alt="front-male-muscle-group"></img>

                <img id="front-male-abs" src="/images/maleUI/front/front-abs.png" alt="front-abs" onClick={this.handleAbsClick} onMouseLeave={()=>this.handleMouseLeave('hoverAbs')} onMouseEnter={()=>this.handleMouseEnter('hoverAbs')} style= {this.state.Abs || this.state.hoverAbs ? {opacity:1} : {opacity:0}}></img>

                <div className="front-male-arms" onClick={this.handleArmsClick} onMouseLeave={()=>this.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.handleMouseEnter('hoverArms')} style= {this.state.Arms || this.state.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img id="front-male-left-arm" src="/images/maleUI/front/front-left-arm.png" alt="front-left-arm"></img>
                    <img id="front-male-right-arm" src="/images/maleUI/front/front-right-arm.png" alt="front-right-arm"></img>
                </div>

                <div className="front-male-chest" onClick={this.handleChestClick} onMouseLeave={()=>this.handleMouseLeave('hoverChest')} onMouseEnter={()=>this.handleMouseEnter('hoverChest')} style= {this.state.Chest || this.state.hoverChest ? {opacity:1} : {opacity:0}}>
                    <img id="front-male-left-chest" src="/images/maleUI/front/front-left-chest.png" alt="front-left-chest"></img>
                    <img id="front-male-right-chest" src="/images/maleUI/front/front-right-chest.png" alt="front-right-chest"></img>
                </div>

                <div className="front-male-shoulder" onClick={this.handleShouldersClick} onMouseLeave={()=>this.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.handleMouseEnter('hoverShoulders')} style= {this.state.Shoulders || this.state.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img id="front-male-top-shoulder" src="/images/maleUI/front/front-top-shoulder.png" alt="front-top-shoulder"></img>
                    <img id="front-male-left-shoulder" src="/images/maleUI/front/front-left-shoulder.png" alt="front-left-shoulder"></img>
                    <img id="front-male-right-shoulder" src="/images/maleUI/front/front-right-shoulder.png" alt="front-right-shoulder"></img>
                </div>

                <div className="front-male-legs" onClick={this.handleLegsClick} onMouseLeave={()=>this.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.handleMouseEnter('hoverLegs')} style= {this.state.Legs || this.state.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img id="front-male-left-leg" src="/images/maleUI/front/front-left-leg.png" alt="front-left-leg"></img>
                    <img id="front-male-right-leg" src="/images/maleUI/front/front-right-leg.png" alt="front-right-leg"></img>
                </div>        
            </div>
            </div>
        )
    }

}





const mSTP = (state) => ({

})

const mDTP = dispatch =>({
    fetchMuscleGroups: () => dispatch(fetchMuscleGroups()),
})

export default  connect(mSTP, mDTP)(MaleFront);