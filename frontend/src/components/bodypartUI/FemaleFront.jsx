import React, { Component } from 'react';
import '../../scss/bodyUI/femaleFront.scss';


export default class FemaleFront extends Component {

    render() {
        return (
            <div className="female-front-container">
            <div className="female-front-selector">
                <img id="front-female-muscle-group" alt="front-female-muscle-group" src="/images/femaleUI/front/front-female-muscle-group.png" ></img>

                <img id="front-female-abs" alt="front-female-abs" src="/images/femaleUI/front/front-female-abs.png" onClick={() => this.props.handleClick("Abs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverAbs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverAbs')} style= {this.props.Abs || this.props.hoverAbs ? {opacity:1} : {opacity:0}}></img>

                <div className="front-female-arms" onClick={() => this.props.handleClick("Arms")} onMouseLeave={()=>this.props.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.props.handleMouseEnter('hoverArms')} style= {this.props.Arms || this.props.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-left-arm" alt="front-female-left-arm" src="/images/femaleUI/front/front-female-left-arm.png"></img>
                    <img id="front-female-right-arm" alt="front-female-right-arm" src="/images/femaleUI/front/front-female-right-arm.png"></img>
                </div>

                <img id="front-female-chest" alt="front-female-chest" src="/images/femaleUI/front/front-female-chest.png" onClick={() => this.props.handleClick("Chest")} onMouseLeave={()=>this.props.handleMouseLeave('hoverChest')} onMouseEnter={()=>this.props.handleMouseEnter('hoverChest')} style= {this.props.Chest || this.props.hoverChest ? {opacity:1} : {opacity:0}}></img>

                <div className="front-female-shoulder" onClick={() => this.props.handleClick("Shoulders")} onMouseLeave={()=>this.props.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.props.handleMouseEnter('hoverShoulders')} style= {this.props.Shoulders || this.props.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-top-shoulder" alt="front-female-top-shoulder" src="/images/femaleUI/front/front-female-front-shoulder.png"></img>
                    <img id="front-female-left-shoulder" alt="front-female-left-shoulder" src="/images/femaleUI/front/front-female-left-shoulder.png"></img>
                    <img id="front-female-right-shoulder" alt="front-female-right-shoulder" src="/images/femaleUI/front/front-female-right-shoulder.png"></img>
                </div>

                <div className="front-female-legs" onClick={() => this.props.handleClick("Legs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverLegs')} style= {this.props.Legs || this.props.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img id="front-female-left-leg" alt="front-female-left-leg" src="/images/femaleUI/front/front-female-left-leg.png"></img>
                    <img id="front-female-right-leg" alt="front-female-right-leg" src="/images/femaleUI/front/front-female-right-leg.png"></img>
                </div> 
            </div>
            </div>
        )
    }

}