import React, { Component } from 'react';
import '../../scss/bodyUI/femaleBack.scss';
import { connect } from 'react-redux';
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';

class FemaleBack extends React.Component {
    constructor(props){
        super(props);
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
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleCalvesClick = this.handleCalvesClick.bind(this);
        this.handleArmsClick = this.handleArmsClick.bind(this);
        this.handleShouldersClick = this.handleShouldersClick.bind(this);
        this.handleLegsClick = this.handleLegsClick.bind(this);

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

    handleBackClick(e){
        e.preventDefault();
        this.setState({Back: !this.state.Back})
    }

    handleCalvesClick(e){
            e.preventDefault();
            this.setState({Calves: !this.state.Calves})
    }

    handleArmsClick(e){
            e.preventDefault();
            this.setState({Arms: !this.state.Arms})
    }

    handleShouldersClick(e){
        e.preventDefault();
        this.setState({Shoulders: !this.state.Shoulders})
    }

    handleLegsClick(e){
        e.preventDefault();
        this.setState({Legs: !this.state.Legs})
    }

    render() {
        return (
            <div className="female-front-container">
                <div className="female-front-selector">
                <img id="back-female-muscle-group" src="/images/femaleUI/back/back-female-muscle-group.png"></img>

                <img id="back-female-back" src="/images/femaleUI/back/back-female-back.png" onClick={this.handleBackClick} onMouseLeave={()=>this.handleMouseLeave('hoverBack')} onMouseEnter={()=>this.handleMouseEnter('hoverBack')} style= {this.state.Back || this.state.hoverBack ? {opacity:1} : {opacity:0}}></img>

                <img id="back-female-calves" src="/images/femaleUI/back/back-female-calves.png" onClick={this.handleCalvesClick} onMouseLeave={()=>this.handleMouseLeave('hoverCalves')} onMouseEnter={()=>this.handleMouseEnter('hoverCalves')} style= {this.state.Calves || this.state.hoverCalves ? {opacity:1} : {opacity:0}}></img>

                <div className="back-female-legs" onClick={this.handleLegsClick} onClick={this.handleLegsClick} onMouseLeave={()=>this.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.handleMouseEnter('hoverLegs')} style= {this.state.Legs || this.state.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-left-leg" src="/images/femaleUI/back/back-female-left-leg.png"></img>
                    <img id="back-female-right-leg" src="/images/femaleUI/back/back-female-right-leg.png" ></img>
                </div>

                <div className="back-female-shoulder" onClick={this.handleShouldersClick} onClick={this.handleShouldersClick} onMouseLeave={()=>this.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.handleMouseEnter('hoverShoulders')} style= {this.state.Shoulders || this.state.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-top-shoulder" src="/images/femaleUI/back/back-female-top-shoulder.png" ></img>
                    <img id="back-female-left-shoulder" src="/images/femaleUI/back/back-female-left-shoulder.png" ></img>
                    <img id="back-female-right-shoulder" src="/images/femaleUI/back/back-female-right-shoulder.png"></img>
                </div>

                <div className="back-female-arms" onClick={this.handleArmsClick} onMouseLeave={()=>this.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.handleMouseEnter('hoverArms')} style= {this.state.Arms || this.state.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-left-arm" src="/images/femaleUI/back/back-female-left-arm.png"></img>
                    <img id="back-female-right-arm" src="/images/femaleUI/back/back-female-right-arm.png"></img>
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

export default  connect(mSTP, mDTP)(FemaleBack);