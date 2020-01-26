import React, { Component } from 'react';
import '../../scss/bodyUI/femaleBack.scss';

export default class FemaleBack extends Component {
    render() {
        return (
            <div className="female-front-container">
                <div className="female-front-selector">
                <img id="back-female-muscle-group" alt="back-female-muscle-group" src="/images/femaleUI/back/back-female-muscle-group.png"></img>

                <img id="back-female-back" alt="back-female-back" src="/images/femaleUI/back/back-female-back.png" onClick={() => this.props.handleClick("Back")} onMouseLeave={()=>this.props.handleMouseLeave('hoverBack')} onMouseEnter={()=>this.props.handleMouseEnter('hoverBack')} style= {this.props.Back || this.props.hoverBack ? {opacity:1} : {opacity:0}}></img>

                <img id="back-female-calves" alt="back-female-calves" src="/images/femaleUI/back/back-female-calves.png" onClick={() => this.props.handleClick("Calves")} onMouseLeave={()=>this.props.handleMouseLeave('hoverCalves')} onMouseEnter={()=>this.props.handleMouseEnter('hoverCalves')} style= {this.props.Calves || this.props.hoverCalves ? {opacity:1} : {opacity:0}}></img>

                <div className="back-female-legs" onClick={() => this.props.handleClick("Legs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverLegs')} style= {this.props.Legs || this.props.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-left-leg" alt="back-female-left-leg" src="/images/femaleUI/back/back-female-left-leg.png"></img>
                    <img id="back-female-right-leg" alt="back-female-right-leg" src="/images/femaleUI/back/back-female-right-leg.png" ></img>
                </div>

                <div className="back-female-shoulder" onClick={() => this.props.handleClick("Shoulders")} onMouseLeave={()=>this.props.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.props.handleMouseEnter('hoverShoulders')} style= {this.props.Shoulders || this.props.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-top-shoulder" alt="back-female-top-shoulder" src="/images/femaleUI/back/back-female-top-shoulder.png" ></img>
                    <img id="back-female-left-shoulder" alt="back-female-left-shoulder" src="/images/femaleUI/back/back-female-left-shoulder.png" ></img>
                    <img id="back-female-right-shoulder" alt="back-female-right-shoulder" src="/images/femaleUI/back/back-female-right-shoulder.png"></img>
                </div>

                <div className="back-female-arms" onClick={() => this.props.handleClick("Arms")} onMouseLeave={()=>this.props.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.props.handleMouseEnter('hoverArms')} style= {this.props.Arms || this.props.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img id="back-female-left-arm" alt="back-female-left-arm" src="/images/femaleUI/back/back-female-left-arm.png"></img>
                    <img id="back-female-right-arm" alt="back-female-right-arm" src="/images/femaleUI/back/back-female-right-arm.png"></img>
                </div>
            </div>
            </div>
        )
    }

}