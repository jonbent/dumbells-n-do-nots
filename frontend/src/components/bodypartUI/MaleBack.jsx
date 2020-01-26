import React, { Component } from 'react';
import '../../scss/bodyUI/maleBack.scss';

export default class MaleBack extends Component {

    render() {
        return (
            <div className="male-back-container">
                <div className="male-back-selector">
                    <img id="back-male-muscle-group" src="/images/maleUI/back/back-male-muscle-group.png" alt="back-male-muscle-group"></img>

                    <img id="back-male-back" src="/images/maleUI/back/back-back.png" alt="back-back" onClick={() => this.props.handleClick("Back")} onMouseLeave={()=>this.props.handleMouseLeave('hoverBack')} onMouseEnter={()=>this.props.handleMouseEnter('hoverBack')} style= {this.props.Back || this.props.hoverBack ? {opacity:1} : {opacity:0}}></img>

                    <img id="back-male-calves" src="/images/maleUI/back/back-calves.png" alt="back-calves" onClick={() => this.props.handleClick("Calves")} onMouseLeave={()=>this.props.handleMouseLeave('hoverCalves')} onMouseEnter={()=>this.props.handleMouseEnter('hoverCalves')} style= {this.props.Calves || this.props.hoverCalves ? {opacity:1} : {opacity:0}}></img>

                    <div className="back-male-arms" onClick={() => this.props.handleClick("Arms")} onMouseLeave={()=>this.props.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.props.handleMouseEnter('hoverArms')} style= {this.props.Arms || this.props.hoverArms ? {opacity:1} : {opacity:0}}>
                            <img id="back-male-left-arm" src="/images/maleUI/back/back-left-arm.png" alt="back-left-arm"></img>
                            <img id="back-male-right-arm" src="/images/maleUI/back/back-right-arm.png" alt="back-right-arm"></img>
                    </div>

                    <div className="back-male-shoulder" onClick={() => this.props.handleClick("Shoulders")} onMouseLeave={()=>this.props.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.props.handleMouseEnter('hoverShoulders')} style= {this.props.Shoulders || this.props.hoverShoulders ? {opacity:1} : {opacity:0}}>
                            <img id="back-male-top-shoulder" src="/images/maleUI/back/back-top-shoulder.png" alt="back-top-shoulder"></img>
                            <img id="back-male-left-shoulder" src="/images/maleUI/back/back-left-shoulder.png" alt="back-left-shoulder"></img>
                            <img id="back-male-right-shoulder" src="/images/maleUI/back/back-right-shoulder.png" alt="back-right-shoulder"></img>
                    </div>

                    <img id="back-male-legs" src="/images/maleUI/back/back-legs.png" alt="back-legs" onClick={() => this.props.handleClick("Legs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverLegs')} style= {this.props.Legs || this.props.hoverLegs ? {opacity:1} : {opacity:0}}></img>
                </div>
            </div>
        )
    }

}