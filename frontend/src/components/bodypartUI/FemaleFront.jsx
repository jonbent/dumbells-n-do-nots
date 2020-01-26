import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../scss/bodyUI/femaleFront.scss';
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';


class FemaleFront extends Component {

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

    handleAbsClick(e){
        e.preventDefault();
        this.setState({Abs: !this.state.Abs})
    }

     handleChestClick(e){
        e.preventDefault();
        this.setState({Chest: !this.state.Chest})
    }
     handleLegsClick(e){
        e.preventDefault();
        this.setState({Legs: !this.state.Legs})
    }
     handleShouldersClick(e){
        e.preventDefault();
        this.setState({Shoulders: !this.state.Shoulders})
    }

    handleArmsClick(e){
        e.preventDefault();
        this.setState({Arms: !this.state.Arms})
    }

    render() {
        return (
            <div className="female-front-container">
            <div className="female-front-selector">
                <img id="front-female-muscle-group" alt="front-female-muscle-group" src="/images/femaleUI/front/front-female-muscle-group.png" ></img>

                <img id="front-female-abs" alt="front-female-abs" src="/images/femaleUI/front/front-female-abs.png" onClick={this.handleAbsClick} onMouseLeave={()=>this.handleMouseLeave('hoverAbs')} onMouseEnter={()=>this.handleMouseEnter('hoverAbs')} style= {this.state.Abs || this.state.hoverAbs ? {opacity:1} : {opacity:0}}></img>

                <div className="front-female-arms" onClick={this.handleArmsClick} onMouseLeave={()=>this.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.handleMouseEnter('hoverArms')} style= {this.state.Arms || this.state.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-left-arm" alt="front-female-left-arm" src="/images/femaleUI/front/front-female-left-arm.png" onClick=""></img>
                    <img id="front-female-right-arm" alt="front-female-right-arm" src="/images/femaleUI/front/front-female-right-arm.png" onClick=""></img>
                </div>

                <img id="front-female-chest" alt="front-female-chest" src="/images/femaleUI/front/front-female-chest.png" onClick={this.handleChestClick} onMouseLeave={()=>this.handleMouseLeave('hoverChest')} onMouseEnter={()=>this.handleMouseEnter('hoverChest')} style= {this.state.Chest || this.state.hoverChest ? {opacity:1} : {opacity:0}}></img>

                <div className="front-female-shoulder" onClick={this.handleShouldersClick} onMouseLeave={()=>this.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.handleMouseEnter('hoverShoulders')} style= {this.state.Shoulders || this.state.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-top-shoulder" alt="front-female-top-shoulder" src="/images/femaleUI/front/front-female-front-shoulder.png" onClick=""></img>
                    <img id="front-female-left-shoulder" alt="front-female-left-shoulder" src="/images/femaleUI/front/front-female-left-shoulder.png" onClick=""></img>
                    <img id="front-female-right-shoulder" alt="front-female-right-shoulder" src="/images/femaleUI/front/front-female-right-shoulder.png" onClick=""></img>
                </div>

                <div className="front-female-legs" onClick={this.handleLegsClick} onMouseLeave={()=>this.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.handleMouseEnter('hoverLegs')} style= {this.state.Legs || this.state.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-left-leg" alt="front-female-left-leg" src="/images/femaleUI/front/front-female-left-leg.png" onClick=""></img>
                    <img id="front-female-right-leg" alt="front-female-right-leg" src="/images/femaleUI/front/front-female-right-leg.png" onClick=""></img>
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

export default  connect(mSTP, mDTP)(FemaleFront);