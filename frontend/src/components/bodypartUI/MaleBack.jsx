import React, { Component } from 'react';
import '../../scss/bodyUI/maleBack.scss';
import { connect } from 'react-redux';
import {fetchMuscleGroups} from '../../actions/MuscleGroupActions';


class MaleBack extends Component {

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
            <div className="male-back-container">
            <div className="male-back-selector">
                <img id="back-male-muscle-group" src="/images/maleUI/back/back-male-muscle-group.png" alt="back-male-muscle-group"></img>

                <img id="back-male-back" src="/images/maleUI/back/back-back.png" alt="back-back" onClick={this.handleBackClick} onMouseLeave={()=>this.handleMouseLeave('hoverBack')} onMouseEnter={()=>this.handleMouseEnter('hoverBack')} style= {this.state.Back || this.state.hoverBack ? {opacity:1} : {opacity:0}}></img>

                <img id="back-male-calves" src="/images/maleUI/back/back-calves.png" alt="back-calves" onClick={this.handleCalvesClick} onMouseLeave={()=>this.handleMouseLeave('hoverCalves')} onMouseEnter={()=>this.handleMouseEnter('hoverCalves')} style= {this.state.Calves || this.state.hoverCalves ? {opacity:1} : {opacity:0}}></img>

                <div className="back-male-arms" onClick={this.handleArmsClick} onMouseLeave={()=>this.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.handleMouseEnter('hoverArms')} style= {this.state.Arms || this.state.hoverArms ? {opacity:1} : {opacity:0}}>
                        <img id="back-male-left-arm" src="/images/maleUI/back/back-left-arm.png" alt="back-left-arm"></img>
                        <img id="back-male-right-arm" src="/images/maleUI/back/back-right-arm.png" alt="back-right-arm"></img>
                </div>

                <div className="back-male-shoulder" onClick={this.handleShouldersClick} onMouseLeave={()=>this.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.handleMouseEnter('hoverShoulders')} style= {this.state.Shoulders || this.state.hoverShoulders ? {opacity:1} : {opacity:0}}>
                        <img id="back-male-top-shoulder" src="/images/maleUI/back/back-top-shoulder.png" alt="back-top-shoulder"></img>
                        <img id="back-male-left-shoulder" src="/images/maleUI/back/back-left-shoulder.png" alt="back-left-shoulder"></img>
                        <img id="back-male-right-shoulder" src="/images/maleUI/back/back-right-shoulder.png" alt="back-right-shoulder"></img>
                </div>

                <img id="back-male-legs" src="/images/maleUI/back/back-legs.png" alt="back-legs" onClick={this.handleLegsClick} onMouseLeave={()=>this.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.handleMouseEnter('hoverLegs')} style= {this.state.Legs || this.state.hoverLegs ? {opacity:1} : {opacity:0}}></img>
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

export default  connect(mSTP, mDTP)(MaleBack);