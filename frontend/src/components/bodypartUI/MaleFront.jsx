import React, { Component } from 'react';
import '../../scss/bodyUI/maleFront.scss';



export default class MaleFront extends Component{


    render(){
        return(
            <div className= "male-front-container">
            <div className="male-front-selector">
                
                <img onContextMenu={(e)=> false} id="front-male-muscle-group" src="/images/maleUI/front/front-male-muscle-group.png" alt="front-male-muscle-group"></img>

                <img onContextMenu={(e)=> false} id="front-male-abs" src="/images/maleUI/front/front-abs.png" alt="front-abs" onMouseDownCapture={() => this.props.handleClick("Abs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverAbs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverAbs')} style= {this.props.selectableMuscleGroups.Abs || this.props.hoverAbs ? {opacity:1} : {opacity:0}}></img>

                <div className="front-male-arms" onMouseDownCapture={() => this.props.handleClick("Arms")} onMouseLeave={()=>this.props.handleMouseLeave('hoverArms')} onMouseEnter={()=>this.props.handleMouseEnter('hoverArms')} style= {this.props.selectableMuscleGroups.Arms || this.props.hoverArms ? {opacity:1} : {opacity:0}}>
                    <img onContextMenu={(e)=> false} id="front-male-left-arm" src="/images/maleUI/front/front-left-arm.png" alt="front-left-arm"></img>
                    <img onContextMenu={(e)=> false} id="front-male-right-arm" src="/images/maleUI/front/front-right-arm.png" alt="front-right-arm"></img>
                </div>

                <div className="front-male-chest" onMouseDownCapture={() => this.props.handleClick("Chest")} onMouseLeave={()=>this.props.handleMouseLeave('hoverChest')} onMouseEnter={()=>this.props.handleMouseEnter('hoverChest')} style= {this.props.selectableMuscleGroups.Chest || this.props.hoverChest ? {opacity:1} : {opacity:0}}>
                    <img onContextMenu={(e)=> false} id="front-male-left-chest" src="/images/maleUI/front/front-left-chest.png" alt="front-left-chest"></img>
                    <img onContextMenu={(e)=> false} id="front-male-right-chest" src="/images/maleUI/front/front-right-chest.png" alt="front-right-chest"></img>
                </div>

                <div className="front-male-shoulder" onMouseDownCapture={() => this.props.handleClick("Shoulders")} onMouseLeave={()=>this.props.handleMouseLeave('hoverShoulders')} onMouseEnter={()=>this.props.handleMouseEnter('hoverShoulders')} style= {this.props.selectableMuscleGroups.Shoulders || this.props.hoverShoulders ? {opacity:1} : {opacity:0}}>
                    <img onContextMenu={(e)=> false} id="front-male-top-shoulder" src="/images/maleUI/front/front-top-shoulder.png" alt="front-top-shoulder"></img>
                    <img onContextMenu={(e)=> false} id="front-male-left-shoulder" src="/images/maleUI/front/front-left-shoulder.png" alt="front-left-shoulder"></img>
                    <img onContextMenu={(e)=> false} id="front-male-right-shoulder" src="/images/maleUI/front/front-right-shoulder.png" alt="front-right-shoulder"></img>
                </div>

                <div className="front-male-legs"  onMouseDownCapture={() => this.props.handleClick("Legs")} onMouseLeave={()=>this.props.handleMouseLeave('hoverLegs')} onMouseEnter={()=>this.props.handleMouseEnter('hoverLegs')} style= {this.props.selectableMuscleGroups.Legs || this.props.hoverLegs ? {opacity:1} : {opacity:0}}>
                    <img onContextMenu={(e)=> false} id="front-male-left-leg" src="/images/maleUI/front/front-left-leg.png" alt="front-left-leg"></img>
                    <img onContextMenu={(e)=> false} id="front-male-right-leg" src="/images/maleUI/front/front-right-leg.png" alt="front-right-leg"></img>
                </div>        
            </div>
            </div>
        )
    }

}